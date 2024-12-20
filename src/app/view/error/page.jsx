'use client';

export default function ErrorPage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Oops! Something Went Wrong</h1>
      <p style={styles.description}>
        We encountered an unexpected issue. Please try refreshing the page or come back later.
      </p>
      <button style={styles.button} onClick={handleRefresh} type="button">
        Refresh Page
      </button>    
      <a href="/view/login" style={styles.link}>
        Login Page
      </a>
      <a href="/" style={styles.link}>
        Go to Homepage
      </a>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#f5c6cb',
    color: '#721c24',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  link: {
    color: '#721c24',
    textDecoration: 'underline',
    fontSize: '1rem',
  },
};