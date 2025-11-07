import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/home.css";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams(); // get category from URL
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/recipes`);
        setRecipes(res.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.category === categoryName
  );

  return (
    <Layout>
      <div className="home-page">
        <div className="latest-recipes">
          <h2>{categoryName} Recipes</h2>
          <div className="recipes-grid">
            {filteredRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe._id}>
                <Link to={`/recipes/${recipe.slug}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}${recipe.imageURL}`}
                    alt={recipe.name}
                  />
                  <p>{recipe.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
