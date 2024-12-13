import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { articles } from "../utils";

const Articles = () => {
    return (
        <section id="articles" className="relative flex flex-col w-full h-[70vh] bg-secondary">
            {/* White Triangle with Right Top */}
            <div className="absolute top-0 right-up-triangle w-full h-[100px] bg-white"></div>

            <div className="relative top-[140px] w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto font-open-sans z-10">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl font-bold">Articles</h1>

                    <Button
                        type="button"
                        text="Read more"
                        size="normal"
                        rounded="full"
                        fillMethod="outline"
                        colorSet="primary"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 py-7 gap-2">
                    {articles.map((article, index) => (
                        <Link key={index} to={article.link}>
                            <div className="flex flex-col gap-2 w-full h-[170px] p-2 rounded-lg border bg-transparent font-open-sans">
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