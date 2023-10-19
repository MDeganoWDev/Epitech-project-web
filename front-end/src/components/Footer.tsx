const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2023 Job Board</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;