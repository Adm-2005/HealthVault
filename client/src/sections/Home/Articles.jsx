import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Carousel from "../../components/ui/Carousel";
import { articles } from "../../utils";

const Articles = () => {
    return (
        <section id="about" className="relative flex flex-col w-full h-[70vh] bg-secondary">
            {/* White Triangle with Right Top */}
            <div className="absolute top-0 right-up-triangle w-full h-[100px] bg-white"></div>

            <div className="relative top-[140px] w-full h-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto font-open-sans z-10">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl font-bold">Articles</h1>

                    <Link to="https://scholar.google.co.in/scholar?q=digitized+health+records&hl=en&as_sdt=0&as_vis=1&oi=scholart">
                        <Button
                            type="button"
                            text="Read more"
                            size="normal"
                            rounded="full"
                            fillMethod="outline"
                            colorSet="primary"
                        />
                    </Link>
                </div>
                <Carousel 
                    className="flex md:hidden py-7" 
                    controls={false} 
                    itemsPerSlide={1} 
                    pagination={false} 
                    autoPlay={true} 
                    infinite={true}
                >
                    {articles.map((article, index) => (
                        <Link key={index} to={article.link}>
                            <div className="flex flex-col gap-2 w-full h-[220px] p-3 rounded-lg border border-gray-300 bg-transparent font-open-sans">
                                <p className="text-gray-600 text-xs">{article.date}</p>
                                <p className="text-lg">{article.title}</p>
                                <p className="text-gray-600 text-sm">{article.description}</p>
                            </div>
                        </Link>
                    ))}
                </Carousel>
                <div className="hidden md:grid grid-cols-3 py-7 gap-2">
                    {articles.map((article, index) => (
                        <Link key={index} to={article.link}>
                            <div className="flex flex-col gap-2 w-full h-[220px] lg:h-[200px] p-3 rounded-lg border border-gray-300 bg-transparent font-open-sans">
                                <p className="text-gray-600 text-xs">{article.date}</p>
                                <p className="text-lg">{article.title}</p>
                                <p className="text-gray-600 text-sm">{article.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* White Triangle Left Down */}
            <div className="absolute bottom-0 left-down-triangle w-full h-[100px] bg-white"></div>
        </section>
    );
}

export default Articles;