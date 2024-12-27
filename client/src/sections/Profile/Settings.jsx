import PropTypes from "prop-types";
import Button from "../../components/ui/Button";
import { settingsOptions } from "../../utils";

const Settings = ({ user }) => {
    return (
        <section id="settings" className="flex flex-col gap-5 w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto">
            <div className="flex flex-col gap-2 font-open-sans">
                <h1 className="font-bold text-2xl md:text-3xl text-gray-900">Settings</h1>
                <p className="text-gray-700 text-md font-open-sans">Manage your account with these actions.</p>
            </div>

            <div className="flex flex-col gap-2">
                {settingsOptions.map((option, index) => (
                    <div key={index} className="flex px-3 py-2 items-center justify-between border border-gray-800 rounded-lg">
                        <p className="w-3/5 text-gray-800 text-md font-open-sans font-semibold">{option.description}</p>
                        <Button
                            type="button"
                            text={option.btnText}
                            size="small"
                            colorSet="red"
                            className="w-1/5"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

Settings.propTypes = {
    user: PropTypes.object
}

export default Settings;