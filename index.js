let c = document.createElement("canvas");
document.body.append(c);
let ctx = c.getContext("2d");

function encje(tekst)
{
	return tekst.replace( /#/g, "%23")
				.replace(/\?/g, "%3F")
				.replace(/\"/g, "%22")
				.replace(/\|/g, "%7C");
}

async function pobierzDane(url, skala)
{
	let img = await new Promise((resolve, reject) =>
	{
		let img = new Image();
		img.onload = () => resolve(img);
		img.onerror = e =>
		{
			console.error(e);
			reject();
		};
		img.src = encje(url);
	});

	c.width  = img.width / skala;
	c.height = img.height / skala;

	ctx.clearRect(0, 0, c.width, c.height);
	ctx.drawImage(img, 0, 0, c.width, c.height);
	let imgD = ctx.getImageData(0, 0, c.width, c.height);
	ctx.clearRect(0, 0, c.width, c.height);
	return imgD;
}

let dystans = 20;

(async () =>
{
	let obraz = await pobierzDane("obraz.jpg", 1);

	setInterval(() =>
	{
		for(let i = 0; i < 200; i++)
		{
			let x = Math.random() * obraz.width;
			let y = Math.random() * obraz.height;

			let i = (Math.floor(y) * obraz.width + Math.floor(x)) * 4;

			let r = obraz.data[i    ];
			let g = obraz.data[i + 1];
			let b = obraz.data[i + 2];

			ctx.fillStyle = "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2) + "88";

			ctx.beginPath();
			ctx.arc(x, y, Math.random() * 20, 0, 2 * Math.PI);
			ctx.fill();
		}
	}, 1);
})();
