import "./Daydeal.css";
import Dealcard from "./Dealcard";
const Daydeal = () => {
  const images = [
    {
      image:
        "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/11/21/975768bf-f076-45d3-9502-c8d4a33990a21669040716553-Sweatshirts---Trousers.jpg",
      link: "/products/men",
    },
    {
      image:
        "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/11/21/533b8079-669b-4498-9e33-eb04106db9b51669040778434-Footwear--9-.jpg",
      link: "/products/women",
    },
    {
      image:
        "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/8/17/d5f885c5-4a54-4634-81da-6333aa51c1a11660744537981-Dresses--13-.jpg",
      link: "/products/women",
    },
    {
      image:
        "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/11/21/0e6ad47f-2641-4c85-bfa8-ced3772491141669040801344-Home-Furnishing--2-.jpg",
      link: "/products/home&living",
    },
    {
      image:
        "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/11/21/e67f15ed-122e-4d2e-b19d-f892473b6b681669040825359-Ethnic-Wear--9-.jpg",
      link: "/products/kids",
    },
    {
      image:
        "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/11/21/2e18496e-ce84-40c0-a0a9-32639eabcd151669040869676-Myntra-Unique-Casuals-----1--1-.jpg",
      link: "/products/men",
    },
    {
      image:
        "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/11/21/ba9a1d49-71eb-41f5-b5ed-2062ccabb8a71669040896098-Premium-Watches--12-.jpg",
      link: "/products/men",
    },
    {
      image:
        "https://assets.myntassets.com/f_webp,w_122,c_limit,fl_progressive,dpr_2.0/assets/images/2022/11/21/d7b8d5d8-b0c8-4a10-bb0a-5d62cb1bc62f1669040922314-carlton.jpg",
      link:"/products/beauty"
    },
  ];

  const dealcards = images.map((e) => <Dealcard image={e.image} key={e.image} link={e.link} />);

  return (
    <div className="day-deal-container">
      <h1>DEAL OF THE DAY</h1>
      <div className="card-containe">{dealcards}</div>
    </div>
  );
};
export default Daydeal;
