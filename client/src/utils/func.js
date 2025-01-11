// id encoding 
export const encodeId = (id) => btoa(id);
export const decodeId = (id) => atob(id);

// date formatting
export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');       
    return `${year}-${month}-${day}`;
};

// authentication
export const getCsrfToken = () => {
    const cookies = document.cookie.split('; ');
    const csrfToken = cookies.find(row => row.startsWith('csrf_access_token='));
    return csrfToken ? csrfToken.split('=')[1] : null;
};