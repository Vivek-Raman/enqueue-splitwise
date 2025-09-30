import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0 mx-auto w-full mb-2 text-sm flex flex-row justify-center divide-x divide-gray-300">
      <div className="px-2">Privacy</div>
      <div className="px-2">
        Built by{" "}
        <Link className="underline" href="https://vivekraman.dev">
          Vivek Raman
        </Link>
      </div>
    </div>
  );
}
