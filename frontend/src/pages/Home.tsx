
import Appbar from '../components/Appbar'

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
    <Appbar/>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to our Blogging Platform!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create</h2>
            <p className="text-gray-700 mb-4">Whether you're a seasoned writer or a first-time blogger, our intuitive
              interface makes it easy to create and publish captivating content. Simply sign up, start a new post,
              and let your creativity flow.</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update</h2>
            <p className="text-gray-700 mb-4">Your journey as a blogger is dynamic, and so are your thoughts. With our
              platform, updating your posts is as simple as a few clicks. Edit, revise, or add new insights to
              keep your content fresh and engaging.</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Connect</h2>
            <p className="text-gray-700 mb-4">Engage with your audience and build a community around your blog. Our
              commenting system allows for meaningful discussions, while social media integration enables seamless
              sharing across various platforms.</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Discover</h2>
            <p className="text-gray-700 mb-4">Explore a diverse range of topics and discover new voices within our
              vibrant blogging community. From lifestyle and travel to technology and beyond, there's something
              for everyone to enjoy.</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Customize</h2>
            <p className="text-gray-700 mb-4">Make your blog uniquely yours with customizable themes and layouts.
              Showcase your personality and style, ensuring that your blog reflects your individuality.</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Monetize</h2>
            <p className="text-gray-700 mb-4">Turn your passion for blogging into a source of income. Our platform offers
              various monetization options, including ad placements, sponsored content opportunities, and affiliate
              marketing integrations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home