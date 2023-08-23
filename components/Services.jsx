import Image from "next/image";

export default ({
  setOpenProfile,
  setCompleteModal,
  setGetModel,
  setStartModal,
}) => {
  const team = [
    {
      name: "completeShipment",
    },
    {
      name: "getShipment",
    },
    {
      name: "startShipment",
    },
    {
      name: "userProfile",
    },
    {
      name: "shipcoung",
    },
    {
      name: "send",
    },
  ];

  const openModelBox = (text) => {
    if (text === 1) {
      setCompleteModal(true);
    } else if (text === 2) {
      setGetModel(true);
    } else if (text === 3) {
      setStartModal(true);
    } else if (text === 4) {
      setOpenProfile(true);
    }
  };

  return (
    <section className="py-0 pb-14 border ">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((item, i) => {
              return (
                <li key={i} className="border">
                  <div
                    onClick={() => openModelBox(i + 1)}
                    className="w-full flex flex-wrap bg-black items-center rounded-xl h-60 sm:h-52 md:h-56"
                  >
                    <p className="w-full break-words font-bold text-4xl text-center text-white">
                      {item.name}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
