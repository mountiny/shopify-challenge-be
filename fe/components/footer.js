export default function Footer() {
  return (
    <footer className="bg-white">
      <ul className="flex items-center justify-between lg:container px-4 py-6 mx-auto text-sm text-black md:px-6">
        <li>
          <a
            href="https://mountiny.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            Vit Horacek
          </a> for Shopify Backend Developer Intern Position
        </li>

        <li>
          <a
            href="https://github.com/mountiny/shopify-challenge-be"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
}
