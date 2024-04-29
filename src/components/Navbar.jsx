import logo from '../assets/pokedex.svg';
export default function Navbar() {
  return (
    <>
      <nav className="bg-red-500 border-none mb-4 rounded-xl">
        <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <div className="flex flex-shrink-0 items-center mr-4" to="/">
                <img className="h-10 w-auto text-white" src={logo} alt="Logo" />
                <span className="hidden md:block text-white text-3xl font-bold ml-4">
                  Pokèdex
                </span>
              </div>
            </div>
            <a
              href="https://github.com/TizianoSapienza/React-Pokedex"
              target="_blank"
            >
              <button
                type="button"
                className="text-red-500 font-bold font-mono hover:text-red-600"
              >
                About
              </button>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
