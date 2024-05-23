import Link from "next/link";

export default function Execution() {
  return (
    <Link
      href="/wykonanie-reklam"
      className="three__wrapper h-full hover:bg-[#f5cb22] duration-[650ms] group"
    >
      <div className="svg__wrapper relative">
        <div className="w-2/5 mx-auto bg-[#f5cb22] rounded-full aspect-square group-hover:bg-[#242323] duration-[650ms] border-[12px] border-[#5c5c5c]">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="-100 -50 800 600"
            xmlSpace="preserve"
            className="aspect-square"
          >
            <g>
              <polygon points="66.938,106.688 0,195.936 0,330.604 66.938,297.938 	" />
              <path
                d="M512.388,238.173L76.5,106.688v188.859l177.461,20.464L424.575,281.3c0.296-0.066,0.593,0.02,0.898,0.02
                c0.307,0,0.612-0.096,0.928-0.038l89.505,16.571L512.388,238.173z M162.562,164.857l86.062,23.906v10.547l-86.062-21.841V164.857z
                 M248.625,241.357l-86.062-14.745v-39.273l86.062,21.841V241.357z"
              />
              <polygon points="233.086,319.053 72.914,302.318 7.172,332.201 128.692,340.568 	" />
              <path
                d="M430.312,291.732v44.619v149.835l127.334-15.329h6.541v-0.784l28.688-3.452V321.835l-76.395-14.152L430.312,291.732z
                 M449.438,338.551v-1.167l54.182,7.421l3.193,0.43v123.003l-57.375,7V338.551z M583.312,458.904l-19.125,2.333V353.086l19.125,2.62
                V458.904z M554.625,462.404l-38.25,4.666V346.545l38.25,5.24V462.404z"
              />
              <polygon
                points="105.188,356.031 105.188,447.506 200.812,459.22 200.812,380.808 248.625,375.232 248.625,465.082 420.75,486.177 
                420.75,335.242 420.75,291.828 284.57,319.54 	"
              />
              <path d="M95.625,352.12L95.625,352.12L95.625,352.12z" />
            </g>
          </svg>
        </div>
        <h4 className="text-white group-hover:text-black duration-300 mx-auto text-center mt-8 mb-4  text-xl">
          WYKONANIE
        </h4>
        <p className="font-light">
          Zrealizujemy Twoją wizję z zaangażowaniem i precyzją. Nasza
          doświadczona załoga dba o każdy detal, zapewniając najwyższą jakość
          usług.
        </p>
      </div>
    </Link>
  );
}
