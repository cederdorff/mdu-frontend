const images = [
    "https://www.eaaa.dk/media/5buh1xeo/anne-kirketerp.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132133643059130000&format=webp",
    "https://www.eaaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335231430000&format=webp",
    "https://www.eaaa.dk/media/lwqbadyv/christina-s%C3%B8gaard-jensen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335238830000&format=webp",
    "https://www.eaaa.dk/media/tthbwpfg/hanne-moisen-enemark-hme.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335249330000&format=webp",
    "https://www.eaaa.dk/media/f0xh1yfs/hanne-skj%C3%A6rlund-andersen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335249970000&format=webp",
    "https://www.eaaa.dk/media/lrbjhrey/heidi-larho.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335252600000&format=webp",
    "https://www.eaaa.dk/media/le0azlgf/jeanne-b%C3%B8dker-nissen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335264530000&format=webp",
    "https://www.eaaa.dk/media/bcwcyryi/jeffrey-david-serio.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335264830000&format=webp",
    "https://www.eaaa.dk/media/3zihz21l/kim-elkjaer-marcher-jepsen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335276900000&format=webp",
    "https://www.eaaa.dk/media/1yfflb3v/lars-b%C3%B8ge-eskildsen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335281270000&format=webp",
    "https://www.eaaa.dk/media/14qpfeq4/line-skj%C3%B8dt.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335287700000&format=webp",
    "https://www.eaaa.dk/media/vk5evkad/lykke-dahlen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335291100000&format=webp",
    "https://www.eaaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335295830000&format=webp",
    "https://www.eaaa.dk/media/4rgjd3dx/marie-elise-brandtoft.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335298570000&format=webp",
    "https://www.eaaa.dk/media/hi4lv5hw/morten-bonderup.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335308630000&format=webp",
    "https://www.eaaa.dk/media/llyavasj/murat-kilic.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335310270000&format=webp",
    "https://www.eaaa.dk/media/s5tlzx35/niels-erik-h-kaster.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335311370000&format=webp",
    "https://www.eaaa.dk/media/fjwlmjpj/per-thykj%C3%A6r-jensen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335316500000&format=webp",
    "https://www.eaaa.dk/media/devlvvgj/rasmus-cederdorff.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335324630000&format=webp",
    "https://www.eaaa.dk/media/dvkczglr/sara-julie-ejstrup-mathiesen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335328000000&format=webp",
    "https://www.eaaa.dk/media/qgcjntty/sergio-da-luz-benros.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335328300000&format=webp",
    "https://www.eaaa.dk/media/hlonpjqi/stinne-j%C3%B8rup-heydari-pour.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132301335332730000&format=webp",
    "https://www.eaaa.dk/media/oayjq02h/martin-n%C3%B8hr.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132792921658800000&format=webp",
    "https://www.eaaa.dk/media/lxzcybme/kasper-topp.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132792921618200000&format=webp",
    "https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132792921559630000&format=webp",
    "img/sbj.jpg",
    "img/marlene.jpg",
    "https://www.eaaa.dk/media/o5fptmq2/andreas-thorngreen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132792921522030000&format=webp",
    "img/lthi.jpg",
    "https://www.eaaa.dk/media/gwqpxel2/christina-jacobsen.jpg?anchor=center&mode=crop&width=1000&height=1000&rnd=132792921554230000&format=webp"
];

for (const image of images) {
    document.querySelector("#content").innerHTML += `<article><img src="${image}"></article>`;
}
