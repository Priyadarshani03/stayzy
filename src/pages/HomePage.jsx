import React from 'react';
import Navbar from "../components/Navbar"
import Slide from "../components/Slide"
import Categories from "../components/Categories"
import Listings from "../components/Listings"
import Footer from "../components/Footer"
import ErrorBoundary from "../components/ErrorBoundary"

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="relative flex-grow">
        <ErrorBoundary>
          <Slide />
        </ErrorBoundary>
      </div>
      <ErrorBoundary>
        <Categories />
      </ErrorBoundary>
      <ErrorBoundary>
        <Listings />
      </ErrorBoundary>
      <Footer />
    </div>
  )
}

export default HomePage