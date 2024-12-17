import PropTypes from "prop-types";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import Button from "./ui/Button";

const Card = ({ 
    children, 
    className = '', 
    itemType = '', 
    selected, 
    accessGranted, 
    checkboxHandler,
    btnHandler,
    btnHandler2
}) => {
    return (
        <div className={`${className} flex gap-1 w-full items-center border rounded-md font-open-sans`}>
            <button className="w-1/5 h-full px-3 py-2 border-r">
                {selected 
                    ? <ImCheckboxChecked onClick={checkboxHandler} className="text-green-600" />
                    : <ImCheckboxUnchecked onClick={checkboxHandler} />
                }
            </button>

            <div className="flex flex-col md:flex-row gap-1 w-4/5 justify-between items-start md:items-center px-3 py-2">
                {children}
                {itemType === 'record' && (
                    <Button
                        type="button"
                        text="View File"
                        size="small"
                        colorSet="black"
                        className="mr-3"
                        onClick={btnHandler}
                    />
                )}
                {itemType === 'package' && (
                    <div>
                        <Button
                            type="button"
                            size="small"
                            colorSet="black"
                            onClick={btnHandler}
                            text={accessGranted ? 'Revoke Access' : 'Grant Access'}
                        />

                        <Button 
                            type="button"
                            size="small"
                            colorSet="accentgreen"
                            text="Summarize"
                            onClick={btnHandler2}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    itemType: PropTypes.oneOf(['record', 'package']),
    selected: PropTypes.bool,
    accessGranted: PropTypes.bool,
    checkboxHandler: PropTypes.func,
    btnHandler: PropTypes.func,
    btnHandler2: PropTypes.func
}

export default Card;