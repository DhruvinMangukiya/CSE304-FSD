import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.type !== 'application/pdf') {
      setStatus({ type: 'error', message: 'Only PDF files are allowed.' });
      setFile(null);
      return;
    }
    if (selected.size > 2 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'File too large. Max 2MB.' });
      setFile(null);
      return;
    }
    setStatus({ type: 'idle', message: '' });
    setFile(selected);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: 'error', message: 'Please select a PDF file first.' });
      return;
    }
    try {
      setStatus({ type: 'loading', message: 'Uploading...' });
      const formData = new FormData();
      formData.append('resume', file);
      const res = await fetch('http://localhost:5007/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Upload failed');
      }
      setStatus({ type: 'success', message: data?.message || 'Uploaded successfully!' });
      setFile(null);
      const input = document.getElementById('file-input');
      if (input) input.value = '';
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Upload error' });
    }
  };

  const getStatusAlertClass = () => {
    switch (status.type) {
      case 'error':
        return 'alert-danger';
      case 'success':
        return 'alert-success';
      case 'loading':
        return 'alert-info';
      default:
        return 'alert-secondary';
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 p-3"
      style={{
        background: 'linear-gradient(135deg, #e0e7ff 0%, #ffffff 50%, #e6f0ff 100%)',
      }}
    >
      <div className="w-100" style={{ maxWidth: '28rem' }}>
        <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5">
          <div className="card-body">
            <h1 className="card-title h2 fw-bold text-dark mb-4">Upload Your Resume</h1>
            <p className="text-muted small mb-4">Please upload a PDF file (max 2MB)</p>
            <form onSubmit={handleUpload}>
              <div className="mb-4">
                <label htmlFor="file-input" className="form-label">
                  Select PDF File
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="form-control"
                />
                {file && (
                  <div className="mt-2 small text-muted text-truncate">
                    Selected: {file.name}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="btn btn-primary w-100 fw-semibold py-3"
              >
                {status.type === 'loading' ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Uploading...
                  </>
                ) : (
                  'Upload Resume'
                )}
              </button>
            </form>
            {status.message && (
              <div className={`mt-4 alert ${getStatusAlertClass()} small`} role="alert">
                {status.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;