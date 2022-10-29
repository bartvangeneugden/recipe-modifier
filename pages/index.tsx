import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { selectRecipeState } from "../store/recipeSlice";
import { useSelector } from "react-redux";

import Container from 'react-bootstrap/Container';
import RecipeCard from '../components/recipeCard';

export default function Home() {
  const recipe = useSelector(selectRecipeState);
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container>
        <RecipeCard recipeData={recipe} />
      </Container>
    </Layout>
  )
}