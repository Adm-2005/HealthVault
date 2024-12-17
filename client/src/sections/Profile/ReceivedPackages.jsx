import { useState } from "react";

const packages = [];

const ReceivedPackages = ({ mode = "section" }) => {
    return (
        <section id="received-packages" className="w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto">
            {packages.length < 1 
                ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 max-w-lg">
                            <h1 className="font-open-sans font-bold text-2xl md:text-3xl text-gray-900">Received Packages</h1>
                            <p className="text-gray-700 text-md font-open-sans">Manage packages received by you.</p>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <p className="font-open-sans mx-auto">You have no received access history.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 justify-between">
                        <h1 className="font-open-sans font-bold text-2xl md:text-3xl text-gray-900 max-w-lg">Packages</h1>
                            
                        <p className="text-gray-700 text-md font-open-sans max-w-lg">
                            Manage packages received by you.
                        </p>
                            
                        <UtilityBar omitButtons={true} />
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
                            btnHandler={() => handleViewFile(record.file_url)}
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
        </section>
    );
}

export default ReceivedPackages;