import React, { useState } from 'react';

export default function Home() {
    const [text, setText] = useState("");
    const [isloading, setIsloading] = useState(true);
    const [movie, setMovie] = useState([]);

    const getMovies = async (url) => {
        try {
            const resp = await fetch(url);
            const data = await resp.json();

            if (data.Response === "True") {
                setIsloading(false);
                setMovie(data.Search);
            } else {
                setIsloading(false);
                setMovie([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handle_click = () => {
        const api = `http://www.omdbapi.com/?apikey=43becc80&s=${text}`;
        setIsloading(true);
        getMovies(api);
    };

    const changetext = (e) => {
        setText(e.target.value);
    };

    return (
        <>
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-4xl font-extrabold p-6 text-center shadow-lg">
                🎬 Movie Search App
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4 px-4">
                <input
                    onChange={changetext}
                    className="h-12 w-full md:w-96 px-4 border-2 border-indigo-700 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                    placeholder="Search for a movie..."
                    type="text"
                />
                <button
                    onClick={handle_click}
                    className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-full shadow transition duration-300"
                >
                    Search
                </button>
            </div>

            {
                isloading ? (
                    ""
                ) : movie.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
                        {movie.map((movie) => (
                            <div
                                key={movie.imdbID}
                                className="bg-amber-100 p-4 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 hover:bg-amber-200 transition-transform duration-300 border border-gray-300"
                            >
                                <img
                                    className="w-full h-72 object-cover"
                                    src={movie.Poster !== "N/A" ? movie.Poster : "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"}
                                    alt={movie.Title}
                                />
                                <div className="p-4 text-center">
                                    <h2 className="text-xl font-semibold mb-1">{movie.Title}</h2>
                                    <p className="text-sm text-gray-600">Year: {movie.Year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg text-red-600 mt-10">No results found 😞</p>
                )
            }
        </>
    );
}
