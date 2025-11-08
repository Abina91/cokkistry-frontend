import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/home.css";
import axios from "axios";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = ({ setCategory }) => {
  const query = useQuery();
  const searchTerm = query.get("q"); // ?q=pasta
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/recipes/search?q=${encodeURIComponent(searchTerm)}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchResults();
  }, [searchTerm]);

  return (
    <Layout setCategory={setCategory}>
      <div className="home-page">
        <h2>Search Results for: <em>{searchTerm}</em></h2>
        <div className="recipes-grid">
          {results.length > 0 ? (
            results.map((recipe) => (
              <div className="recipe-card" key={recipe._id}>
                <Link to={`/recipes/${recipe.slug}`}>
                  <img src={recipe.imageURL.startsWith('http') ? recipe.imageURL : `${process.env.REACT_APP_API_URL}${recipe.imageURL}`} 
                  alt={recipe.name} />

                  <p>{recipe.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No matching recipes found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
