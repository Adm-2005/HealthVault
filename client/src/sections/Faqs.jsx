import Accordion from "../components/ui/Accordion";
import { faqs } from "../utils";

const Faqs = () => {
    return (
        <section id="faqs" className="flex flex-col gap-7 w-full lg:w-[90vw] py-11 px-4 lg:px-[5vw] mx-auto">
            <h1 className="text-2xl font-open-sans font-bold">Frequently Asked Questions</h1>

            <div className="flex flex-col">
                {faqs.map((faq, index) => (
                    <Accordion key={index} qn={faq.qn} ans={faq.ans} number={index + 1}/>
                ))}
            </div>
        </section>
    );
}

export default Faqs;