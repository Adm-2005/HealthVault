import PropTypes from "prop-types";
import { MdUploadFile } from "react-icons/md";
import { MdClear } from "react-icons/md";

const FileUpload = ({ files, setFiles, maxLimit, colorSet }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();

        const droppedFiles = Array.from(event.dataTransfer.files);

        if(files.length < maxLimit) {
            const newFiles = droppedFiles.slice(0, maxLimit - files.length);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }

        setIsDragging(false);
    }

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.dataTransfer.files);

        if(files.length < maxLimit) {
            const newFiles = selectedFiles.slice(0, maxLimit - files.length);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    }

    const handleFileRemoval = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }

    return (
        <div
            onDragEnter = {() => setIsDragging(true)}
            onDragOver = {event => event.preventDefault()}
            onDrop = {handleDrop}
            className={`${isDragging ? '' : ''}`}
        >
            <MdUploadFile className="" />

            {files.length > maxLimit
                ? (<p className=""></p>)
                : (
                    <div className="">
                        <input
                            hidden
                            id="browse"
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .pdf, .docx, .doc, .png"
                            multiple={maxLimit > 1 ? true : false}
                        ></input>
                        <label
                            htmlFor="browse"
                            className=""
                        >
                            Upload File
                        </label>
                    </div>
                )
            }

            {files.length > 0 && (
                <div className="flex">
                    {files.map((file, index) => (
                        <span key={index} className="">
                            {file.name}
                            <MdClear />
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

FileUpload.propTypes = {
    files: PropTypes.array,
    setFiles: PropTypes.func,
    maxLimit: PropTypes.number,
    colorSet: PropTypes.string
};

export default FileUpload;