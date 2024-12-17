import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IoMdAdd } from "react-icons/io";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import TextInput from "../../components/ui/TextInput";
import DateInput from "../../components/ui/DateInput";
import FileUpload from "../../components/ui/FileUpload";
import Card from "../../components/Card";
import UtilityBar from "../../components/UtilityBar";
import { formatDate } from "../../utils";

const records = [];

const UserRecords = ({ mode = "section" }) => {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        recordDate: null,
        file: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDeleteBtn = () => {};

    const handleAddBtn = () => {
        setModalOpen(true);
    };

    const handleCheckboxClick = (index) => {
        setSelectedRecords((prevRecords) => [...prevRecords, index]);
        records[index].selected = true;
    };

    const handleViewFile = (url) => {
        navigate(url);
    };

    return (
        <section id="records" className="flex flex-col gap-5 w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto">
            {records.length < 1 ? (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 max-w-lg">
                        <h1 className="font-open-sans font-bold text-2xl md:text-3xl text-gray-900">Records</h1>
                        <p className="text-gray-700 text-md font-open-sans">Manage your records.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-open-sans mx-auto">You have no record history.</p>
                        <button
                            type="button"
                            onClick={handleAddBtn}
                            className="flex gap-1 justify-center items-center rounded-md px-3 py-2 md:w-[120px] bg-gray-100 hover:bg-gray-200 border border-primary mx-auto"
                        >
                            <p className="hidden md:block text-primary text-lg font-open-sans font-semibold">Add</p>
                            <IoMdAdd className="w-[25px] h-[25px] text-primary" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 max-w-lg">
                        <h1 className="font-open-sans font-bold text-2xl md:text-3xl text-gray-900">Records</h1>
                        <p className="text-gray-700 text-md font-open-sans">Manage your records.</p>
                    </div>
                    <UtilityBar
                        handleAddBtn={handleAddBtn}
                        selectedItems={selectedRecords}
                        handleDeleteBtn={handleDeleteBtn}
                    />
                </div>
            )}

            <div className="flex flex-col gap-2 w-full cursor-pointer">
                {records.length > 0 &&
                    records.map((record, index) => (
                        <Card
                            key={index}
                            className=""
                            itemType="record"
                            selected={record.selected}
                            checkboxHandler={handleCheckboxClick}
                            btnHandler={() => handleViewFile(record.file_url)}
                        >
                            <div className="">
                                <p className="font-bold text-lg text-gray-800">{record.title}</p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Record Date:</span> {formatDate(record.date)}
                                </p>
                            </div>
                        </Card>
                    ))}
            </div>

            {records.length > 5 && (
                <Link>
                    <Button type="button" text="Load More" className="w-[180px] mx-auto" />
                </Link>
            )}

            {modalOpen && (
                <Modal>
                    <TextInput
                        label="Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Blood Report"
                    />
                    <DateInput
                        label="Record Date"
                        value={formData.recordDate}
                        onChange={(date) => setFormData({ ...formData, recordDate: date })}
                    />
                    <FileUpload
                        files={formData.file}
                        onChange={(file) => setFormData({ ...formData, file })}
                    />
                </Modal>
            )}
        </section>
    );
};

UserRecords.propTypes = {
    mode: PropTypes.oneOf(["section", "fullpage"])
};

export default UserRecords;