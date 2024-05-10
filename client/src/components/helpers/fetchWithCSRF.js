const fetchWithCSRF = async (url, options = {}) => {
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const csrfToken = getCookie('csrf_access_token');
    const refreshCsrfToken = getCookie('csrf_refresh_token');

    const response = await fetch(url, {
        ...options,
        credentials: 'include',  // Needed for cookies to be included with requests
        headers: {
            ...options.headers,
            'X-CSRF-TOKEN': csrfToken,
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 401) {  // Assuming 401 indicates an expired or missing CSRF token
        // Attempt to refresh the token
        const refreshResponse = await fetch('/refresh', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': refreshCsrfToken,
            },
        });

        if (refreshResponse.ok) {
            // If the refresh is successful, retry the original request with the new token
            return fetchWithCSRF(url, options);
        } else {
            // If refresh fails, handle as needed (e.g., redirect to login)
            throw new Error('Session expired. Please log in again.');
        }
    }

    return response;
};

export { fetchWithCSRF };