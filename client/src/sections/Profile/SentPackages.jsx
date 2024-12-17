import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import TextInput from "../../components/ui/TextInput";
import DateInput from "../../components/ui/DateInput";
import FileUpload from "../../components/ui/FileUpload";
import UtilityBar from "../../components/UtilityBar";

const packages = [];

const SentPackages = ({ mode = "section" }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        
    });
    const [selectedPackages, setSelectedPackages] = useState([]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleCheckboxClick = (index) => {
        setSelectedPackages((prevPackages) => [...prevPackages, index]);
        packages[index].selected = true;
    };

    const handleAddBtn = () => {
        setModalOpen(true);
    }

    const handleDeleteBtn = () => {}

    return (
        <section id="sent-packages" className="flex flex-col gap-5 w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto">

            {packages.length < 1 
                ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 max-w-lg">
                            <h1 className="font-open-sans font-bold text-2xl md:text-3xl text-gray-900">Sent Packages</h1>
                            <p className="text-gray-700 text-md font-open-sans">Manage packages sent by you.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="font-open-sans mx-auto">You have no sent access history.</p>
                            <button
                                type="button"
                                onClick={handleAddBtn}
                                className="flex gap-1 justify-center items-center rounded-md px-3 py-2 md:w-[120px] bg-gray-100 hover:bg-gray-200 border border-primary mx-auto"
                            >
                                <p className="hidden md:block text-primary text-lg font-open-sans font-semibold">Add</p>
                                <IoMdAdd className="w-[25px] h-[25px] text-primary"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 justify-between">
                        <div className="flex flex-col gap-2 max-w-lg">
                            <h1 className="font-open-sans font-bold text-2xl md:text-3xl text-gray-900">Records</h1>
                            <p className="text-gray-700 text-md font-open-sans">Manage your records.</p>
                        </div>
                        <UtilityBar 
                            handleAddBtn={handleAddBtn}
                            handleDeleteBtn={handleDeleteBtn}
                        />
                    </div>
                )
            }

            <div className="flex flex-col gap-2 w-full cursor-pointer">
                {packages.length > 0 &&
                    packages.map((pkg, index) => (
                        <Card
                            key={index}
                            className=""
                            itemType="package"
                            selected={pkg.selected}
                            checkboxHandler={handleCheckboxClick}
                        >
                            <div className="">
                                
                            </div>
                        </Card>
                    ))}
            </div>

            {packages.length > 5 && (
                <Link>
                    <Button type="button" text="Load More" className="w-[180px] mx-auto" />
                </Link>
            )}

            {modalOpen && (
                <Modal>
                    <TextInput 
                        value={formData.title}
                        label="Title"
                        placeholder="e.g. Blood Report"
                    />
                </Modal>
            )}
        </section>
    );
}

export default SentPackages;