import PropTypes from "prop-types";

export const encodeId = (id) => btoa(id);

export const decodeId = (id) => atob(id);

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');       
    return `${year}-${month}-${day}`;
};

encodeId.propTypes = {
    id: PropTypes.number
};

decodeId.propTypes = {
    id: PropTypes.number
};

formatDate.propTypes = {
    date: PropTypes.date
};