import { create } from "zustand";


const useProductStore = create((set, get) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  cart: [], // Kundvagn
 /* 
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),*/
	addToCart: (product) =>
		set((state) => {
		  const existingProduct = state.cart.find((item) => item.id === product.id);
		  if (existingProduct) {
			return {
			  cart: state.cart.map((item) =>
				item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
			  ),
			};
		  }
		  return { cart: [...state.cart, { ...product, quantity: 1 }] };
		}),
	
	  removeFromCart: (id) =>
		set((state) => ({
		  cart: state.cart.filter((item) => item.id !== id),
		})),
	
	  decreaseQuantity: (id) =>
		set((state) => ({
		  cart: state.cart
			.map((item) =>
			  item.id === id && item.quantity > 1
				? { ...item, quantity: item.quantity - 1 }
				: item
			)
			.filter((item) => item.quantity > 0),
		})),
		
  clearCart: () => set({ cart: [] }),
/*
  // Lägg till i Zustand-store
 getCartTotal: (state) =>
	state.cart.reduce((total, item) => total + item.price, 0),
*/
  getCartCount: (state) => state.cart.length, // Räknar antal varor i kundvagnen
/*
getTotalPrice: (state) =>
    state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
*/
/*
getTotalPrice: (state) =>
	state.cart && state.cart.length > 0
	  ? state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
	  : 0,*/
	  getTotalPrice: () =>
		get().cart.reduce((total, item) => total + item.price * item.quantity, 0),  
}));


//export { useProductStore };

const ProductsList = [
	{
	  id: 1,
	  title: 'Vattenglidbana m. vattenanslutning, 650 x 180 cm',
	  price: 460,
	  img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/2/02-77825_-_wehncke_1_.jpg",
	  description: 'ärt att veta. Med vattenglidbanan kan du skapa din egen minivattenpark hemma i trädgården. Det enda som krävs är en ledig vattenslang. Här finns plats för två barn att glida iväg och känna hur det kittlar i magen medan kroppen får svalka i sommarvärmen. Vem kommer först? Troligen det roligaste sättet att bada som finns! 6,5 meter lång och med robusta kanter, så banan kan hålla hela sommaren och plockas fram igen nästa år. Det är en bra idé att strö lite talk på den när du packar ihop den. Det förhindrar att plasten fastnar och går sönder. Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig saker. Underbar för ditt barns känselsinne. Ett lagom stimulerat känselsinne ökar ditt barns trivsel. Puffar igång kroppsmedvetenheten för ditt barn. Ger möjlighet till stora leenden och tjo och tjim. Mäter: 650 x 180 cm. Lämpligt från 3 år till 10 år'
	},	
	{
	  id: 2,
	  title: 'Hoppborg m. badbassäng - Giraff',
	  price: 1825,
	  img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/2/02-18246_-_wehncke_2_.jpg",
	  description: 'Värt att veta. För många barn är det helt enkelt drömmen att få en egen hoppborg. Den här hoppborgen har en rutschkana, plaskdamm och en palm som kan spruta vatten och ge känselsinnet en kick om du kopplar den till en vattenslang. Hoppborgen mäter cirka 165 x 165 x 175 cm och poolen mäter 195 x 142 cm. Denna aktivitet är väldigt värdefull för ditt barns trivsel och förmåga att lära sig nya saker. Stödjer grovmotoriken som får en puff så fort ditt barn rör på sig. Då aktiveras kroppsmedvetenheten för ditt barn. Skapar lätt tjo och tjim och skratt. Mäter: 165 x 165 x 175 cm / Pool: 195 x 142 cm. Lämpligt för barn i åldern 3 år till 6 år'
	},
	{
	  id: 3,
	  title: 'Rutschbana med vattenanslutning, 116 cm',	
	  price: 575,
	  img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/2/02-74400_1_.jpg",
	  description: 'ärt att veta. Fäst en vattenslang i botten av rutschkanan och ge barnen en alldeles egen vattenrutschkana. Väger cirka 2 kg, så den kan flyttas runt. Den går att fälla ihop efter användning, så den är lätt att ställa undan. Max belastning: 25 kg. Aktiviteten utvecklar färdigheter och är bra för ditt barns trivsel. Utvecklar grovmotoriken som aktiveras varje gång ditt barn rör på sig. Motiverar ditt barn till att utvecklas och förstärka sin kroppsmedvetenhet. Kan ge fina skratt så skrattmusklerna blir alldeles ömma. Mäter: 116 x 36 x 32,5 cm. Lämpligt för barn i åldern 1 år till 6 år'
	},
	{
	  id: 4,
	  title: 'Fiskebåt 40 cm (blandade), 1 st.',
	  price: 150,
	  img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//1/2/1211-2006909_1_1.png",
	  description: 'Värt att veta. Stor fiske-bogserbåt som ditt barn kan leka med på stranden, i poolen eller i badkaret. Med tre fiskar som båten kan fånga, och som ditt barn även kan använda som små sandformar. Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig nya saker. Väcker ditt barns fantasi och får leken att blomstra. Perfekt för lekar med roller tillsammans med andra barn då kidsen lär sig att hitta sina platser i leken och inte alltid kan bestämma allting själva. Stimulerar ditt barns förståelse för orsak-verkan. förmågan att kunna förutse ger trygghet för ditt barn. Mäter: 40 cm. Lämpligt från 3 år till 6 år. De flesta barn gillar att skvätta med vatten, och leken kan äga rum såväl på stranden som hemma hos er i badkaret och vid diskhon. Det finns massor av lärande i att märka vattnets droppar, spruta med vattnet, hälla det från en behållare eller känna hur flytkraft kan tvinga upp leksaker till ytan. Dessutom kan du kanske få tvätta håret på ditt barn, medan badleksakerna distraherar.'
	},
	{
	  id: 5,
	  title: "Sandlek - Hinkpaket i 8 delar, blå",
	  price: 295,
	  img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/a/sandleg-spands_t-med-8-dele-bl__b-toys_1074-701330_1_.jpg",
	  description: 'Värt att veta. Kul lekset för stranden eller sandlådan med lite annorlunda delar. Här får du: en krabb-sandform, en sjöstjärne-form, en val, en grävmaskin, en mycket fin väderkvarn, en stor, bra hink, en sil, en skyffel, en kratta. Tar ni med er detta fina sandsetet till stranden så har ni sinnesstimulerande och fantasifulla lekar så det räcker för ditt barn – och då kanske du kan lyckas få 10 minuters avkoppling under parasollet. Kanske.'
	},
	{
		id: 6,
		title: "Såpbubblor - Gigant",
		price: 240,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/0/s02323-01-ses-creative-saebebobler-gigant.png",
		description: "Denna aktivitet utvecklar färdigheter och är nyttig för ditt barns trivsel. Stödjer grovmotoriken som aktiveras varje gång ditt barn är i rörelse. Här är chans till tjo och tjim och skratt. Förstärker ditt barn i att hitta lugnet och vara i nuet.",
	},
	{
		id: 7,
		title: "Jongleringsbollar 3 st.",
		price: 75,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//9/0/900471_1_2.png",
		description: "Värt att veta. Klassiska bollar för ditt barn eller dig själv, om du vill försöka lära dig jonglera. Det är en övning i koncentration, öga-handkoordination och tålamod. För det är få som lär sig jonglera på 10 minuter. Men om du övar 10 minuter varje dag, kommer du snabbt att bli bättre. Att lära sig jonglera är ett fint projekt när du har behov av lugn i sinnet och vill fördjupa dig i att bli bättre på något och följa din egen utveckling på ett tydligt sätt. Börja med att kasta upp en av bollarna i luften och fånga den igen. När du kan göra det hyfsat säkert, kan du gå vidare till att öva med två bollar och till slut med alla tre. Mjuka och lätta att hantera. Aktiviteten utvecklar färdigheter och är väldigt värdefull för ditt barns trivsel. Gagnar ditt barns grovmotorik som får en puff så fort ditt barn använder sin kropp. Stärker öga-handkoordinationen som vi t.ex. använder när vi kastar, griper eller sparkar iväg bollen som flyger mot dig på idrottslektionen, eller när vi klipper noggrant med en sax. Uppmuntrar ditt barn till att använda sin koncentration. Passar från 3 år",
	},
	{
		id: 8,
		title: "Bodyboard - Medium (Ocean)",
		price: 310,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//1/0/1082-970321_-_schildkr_t_1_.png",
		description: "Värt att veta. Väger 320 gram och har en lämplig storlek för att ge ditt barn roliga upplevelser på stranden. Även bra att leka med i poolen eller simhallen. Levereras med ett 90 cm snöre så man kan fästa simbrädan på handleden eller runt foten. Det är inte särskilt kul att se sin bodyboard fångas av vågorna och flyta iväg ut i havet. En kärna av EPS-skum (polystyren expanderad med luft) ger bra flytkraft. Och på utsidan finns en nylonyta. För barn upp till 60 kilo. Denna aktivitet är bra för ditt barns trivsel och förmåga att lära sig saker. Leken stärker ditt barns grovmotorik. Det handlar i synnerhet om att kunna styra koordinationsförmågan mellan armar och ben.Tränar ditt barn i att koordinera kroppen. Puffar igång ditt barns kroppsmedvetenhet. Mäter: 68 x 43 x 4,5 cm . Lämpligt från 3 år till 10 år",
	},
	{
		id: 9,
		title: "Snorkelset (4-10 år)",
		price: 415,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/n/snorkels_t-4-10-_r_schildkr_t_1082-940011_1_.jpg",
		description: "Värt att veta. Nu har ditt barn möjlighet att dyka på upptäcksresa när ni är på stranden. Det finns nämligen många spännande saker att titta på. Därför är det praktiskt att ha en snorkel så att man inte blir avbruten varje gång man behöver hämta luft. Snorkeln är flexibel och har en rörlig easy clip-hållare som anpassar sig till de flesta huvudformer och storlekar. I toppen är den neonorange så att den är lätt att se. Glasögonen är gjorda av säkerhetsglas för att ge bästa utsikt. Remmen är justerbar. Satsen är perfekt att ta med sig på stranden eller på semestern.Aktiviteten stödjer viktiga färdigheter som är bra för ditt barns trivsel och förmåga att lära sig nya saker. Lämpligt för barn i åldern 4 år till 10 år",
	},
	{
		id: 10,
		title: "Kasta och fånga bollen - 18 cm, 2 st.",
		price: 50,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//9/0/90206.jpg",
		description: "ärt att veta. Håll i handtagen och klicka på avtryckaren - då skjuts kulan upp i luften. Se om ni kan turas om att skjuta iväg kulan och fånga den med korgen. Du känner säkert igen detta paket från barndomens strandutflykter eller lek i parken eller sommarstugan. Leken ger roliga svettpärlor på pannan när ni springer runt för att vara bäst på att fånga den flygande bollen. Det finns 2 korgar och 1 boll i paketet. Aktiviteten utvecklar färdigheter och är nyttig för ditt barns trivsel. Leken stärker grovmotoriken. Det handlar i hög grad om att kunna styra koordinationsförmågan mellan ben och armar. Utvecklar öga-handkoordinationen som vi till exempel använder när vi kastar, sparkar iväg eller griper en boll som flyger mot oss på idrottslektionen, eller när vi klipper rakt med en sax eller ska hälla upp utan att spilla. Sätter fart på ditt barns kondition. Mäter: 18 cm. Passar från 3 år",
	},	
	{
		id: 11,
		title: "Boll av naturgummi - 7 snälla kompisar, Ø13 cm",
		price: 165,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//1/0/1092-sp18031.png",
		description: "Värt att veta. Härlig boll med ventil för uppblåsning. Aktiviteten utvecklar viktiga färdigheter som är nyttiga för ditt barns trivsel och förmåga att lära sig nya saker. Då kan ditt barns avståndsbedömning bli stimulerad. Stimulerar ditt barns grovmotorik som får en boost när ditt barn är i rörelse. Stärker öga-handkoordinationen som vi bland annat gör bruk av när vi kastar, griper eller sparkar iväg en boll som flyger mot dig på idrottslektionen, eller när vi klipper rakt med saxen. Lämpligt för barn i åldern 2 år till 6 år. När ditt barn leker eller spelar med en boll så gagnas avståndsbedömningen. Bollspel kan dessutom ha regler som det är praktiskt att lära sig att känna igen - eller förhandla. Så du kan absolut jubla när ditt barn envetet håller fast i att det på inget sätt var straffspark, eller att bollen INTE var ute. Muskel-ledsinnet blir dessutom totalt aktiverat i bollspel, och det sinnet kan rätt och slätt inte överstimuleras.",
	},
	{
		id: 12,
		title: "Badbassäng 122 x 122 cm",
		price: 490,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//1/2/1211-0775252_1_1.png",
		description: "ärt att veta. På en varm dag kan det vara besvärligt att vara ett litet barn. Kanske har ni inte tänkt er att åka till stranden idag, då är det smart att kunna sätta upp en liten pool på 5 minuter. Denna pool är utformad för att bli klar på nolltid. Fyll den med ljummet vatten, så kan ditt barn bada och plaska sig glad och nöjd. ",
	},
	{
		id: 13,
		title: "Simpuffar (18-30 kg.)",
		price: 430,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/7/0773034_020.png",
		description: "Värt att veta. Armpuffar som gör det lättare för ditt barn att hålla huvudet över vattnet när ni är ute och simmar vid stranden eller i en pool. Hjälper ditt barn känna sig trygg och bekväm i vattnet. Passar barn från 18-30 kg. Lämna aldrig barn utan uppsikt när de badar.VARNING: Detta är inte en livräddningsprodukt - får endast användas under tillsyn av en vuxen. Lämna aldrig ditt barn utan tillsyn. Får endast användas på ett vattendjup anpassat för användaren. Risk för explosion: Fyll inte produkten med för mycket luft. Använd inte högtrycksluft för att pumpa upp produkten. Manuell uppblåsning rekommenderas. Se till att alla kamrar är helt uppblåsta.",
	},
	{
		id: 14,
		title: "5-i-1 Sport- och aktivitetspåse",
		price: 395,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//7/5/75201_0.jpg",
		description: "Värt att veta. En dag på stranden kan väcka bilder av avslappning och en tupplur under parasollet. Men ack - har du barn med dig så kommer det att behövas lite mer action. Kanske händer detta efter 5 minuter, kanske först efter bad och picknick - men förr eller senare är det praktiskt att ha tänkt på extra underhållning och aktivitet att packa ner i strandväskan. Detta paket är lätt att ta med sig. Det kan ligga färdigpackat hemma, redo för nästa gång det härliga sommarvädret lockar ut er. Det finns saker att göra både för de som behöver lite hjälp för att träna bollöga och öga-handkoordination och för de som är redo att spela beachvolley och kasta sig på magen. Ni kan även ta med det till skogen, parken eller bara ut i trädgården. Innehåll: strandtennis-paket, uppblåsbar boll med pump, till exempel för volley, velcro-bollpaket, frisbee, badminton",
	},
	{
		id: 15,
		title: "Vattenbombbollar Ø4 cm - 6 st.",
		price: 90,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/2/02-75105_1_.jpg",
		description: "Värt att veta. Gör er redo för ett vattenkrig med dessa roliga bollar som suger åt sig vatten och gör motståndaren plaskblöt. Denna aktivitet utvecklar färdigheter och är bra för ditt barns trivsel. Stödjer öga-handkoordinationen som vi bl.a. använder när vi håller i en sax och klipper riktigt petigt, vill hälla upp vatten i glaset utan att träffa fel, eller när vi sparkar iväg eller griper bollen som flyger mot oss på idrottslektionen. Ger möjlighet till tjo och tjim och stora leenden. Stödjer barnens muskel-ledsinne som du kanske känner till som det kinestetiska eller proprioceptiva sinnet. Lämpligt för barn i åldern 3 år till 9 år",
	},
	{
		id: 16,
		title: "Badlek - Basketboll för badet",
		price: 180,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//4/2/42-e0221_1_.png",
		description: "Värt att veta. Basket är väl något man spelar naken? I varje fall den här typen av basket. Här är nätet enkelt att sätta upp på kaklet i badrummet med sugkoppar, och sedan är det bara att sikta och skjuta. Inkl. 3 bollar. Denna aktivitet är bra för ditt barns trivsel och förmåga att lära sig saker. Kan ge ljuvliga skratt så skrattmusklerna blir alldeles ömma. En ljuvlig presentidé för nyfikna barn. Nu får kidsen händerna med i leken med orsak/verkan. Mäter: 19,5 x 16 x 6,5 cm. Lämpligt från 18 mån. till 5 år",
	},
	{
		id: 17,
		title: "Badlek med uppdragning - Simmande Teddy",
		price: 150,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//4/2/42-e0204_1_.png",
		description: "Värt att veta. Teddy är en klassisk badleksak som simmar glatt när han dras upp på baksidan. Aktiviteten utvecklar färdigheter och är bra för ditt barns trivsel. Kan ge ljuvliga skratt som tränar skrattmusklerna. En ljuvlig presentidé för nyfikna barn. Nu får ditt barn händerna med i leken med orsak/verkan. Mäter: 9,8 x 10 x 10 cm. Lämpligt från 1 år till 5 år",
	},
	{
		id: 18,
		title: "Vattenlek - Vattenspridare, larv",
		price: 190,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//b/9/b9fa8b5ef7a0323127cc0a2db3298233745b259c_xhap_77872_0k1caldlc0fljw.jpg",
		description: "Värt att veta. När solen skiner och dagen är ljus är det något av det härligaste att låta barnen svalka sig med vattenlekar. Lägg ut denna roliga larv på gräset, anslut trädgårdsslangen (lätt!), och låt barnen hoppa runt och bli härligt blöta medan larven sprutar kallt vatten över dem. Huvudet är lätt att blåsa upp. När det kalla vattnet träffar ditt barns solvarma kropp, bubblar känseln av förtjusning och humöret höjs ett snäpp. Pulsen stiger även, och kanske ger det en energikick och lust att stanna ute i värmen lite längre. Särskilt om det också finns en glass i sikte när det är dags att torka. Larven är tillverkad av slitstark PVC som håller i många år om du tar hand om den. När larven ska packas undan är det en bra idé att torka av den ordentligt och strö på talk innan du viker ihop den. Då undviker du att PVC:n klibbar ihop och går sönder. Köp också några lappar att fixa små hål med, om de uppstår. PVC kan inte återvinnas, så om du ser till att den håller så länge som möjligt gör du både miljön och ditt barn en tjänst. När larvens liv är över och den inte kan lagas längre, kan du klippa isär den och till exempel sy väskor för blöta badkläder eller påsar för smutsiga ombyteskläder av PVC-materialet. Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig nya saker. Då kan ditt barns avståndsbedömning bli stimulerad. Mycket bra på att få igång kroppen och därmed ge grovmotoriken stimulans. Kan ge härliga skratt som tränar skrattmusklerna. Mäter: 64 x 140 cm . Lämpligt för barn i åldern 3 år till 8 år",
	},
	{
		id: 19,
		title: "Vattenpistoler - Haj och Krokodil",
		price: 215,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//v/a/vandpistoler-haj-_-krokodille_b-toys_1074-701551_1_.jpg",
		description: "ärt att veta. Både krokodilen och hajen kan skjuta ut vatten från munnen, så ni kan ha det härligaste vattenkriget hemma. Dra i handtaget baktill och sug upp vatten, tryck sedan ner för att skjuta loss. Lekar med vatten är ett bra sätt att öka tryggheten för ditt barn i samband med vattenanpassning. Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig saker. Fint för ditt barns känselsinne. Ett välintegrerat känselsinne kan förstärka trivseln för ditt barn. Inspirerar ditt barn till att utveckla sig och stimulera sin kroppsmedvetenhet. Ger möjlighet till tjo och tjim och stora leenden. Mäter: Længde: 18 cm. Lämpligt för barn i åldern 18 mån. till 8 år",
	},
	{
		id: 20,
		title: "Sandlek - Sand- och vattenkvarn, Tropical",
		price: 355,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/a/sandleg-sand-og-vandm_lle-tropical_b-toys_1074-701659_1_.jpg",
		description: "Värt att veta. Fin kvarn i finurlig design som med sugkoppen kan fästas på plattorna vid badkaret och användas i badlekar. Kvarnen kan även användas utomhus, t.ex. på stranden eller i sandlådan. Låt ditt barn experimentera med tyngdkraft och energiöverföring genom att se vatten eller sand rinna ner genom väderkvarnen och se hur den nedåtgående rörelsen driver hjulet.Aktiviteten gagnar relevanta färdigheter som är nyttiga för ditt barns trivsel och förmåga att lära sig saker. Släpp loss fantasin och se vart leken leder. Stärker öga-handkoordinationen som vi till exempel använder när vi griper eller sparkar iväg bollen som kommer flygande på idrottslektionen, eller när vi klipper rakt med saxen. Nu får ditt barn händerna med i leken med orsak/verkan. Mäter: 42 x 25 x 14 cm. Lämpligt för barn i åldern 18 mån. till 6 år",
	},
	{
		id: 21,
		title: "Hink med hällpip 14 cm (blandade färger)",
		price: 45,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/p/spand-med-h_ldetud-14cm-ass-farver-1stk_dantoy_1075-1312.jpg",
		description: "Värt att veta. En hink är oumbärlig i hem med barn. Den kan fyllas med sand eller användas för att vattna med. Den kan även vara praktisk att ha med sig till stranden när man ska samla musselskal eller små krabbklor. Stimulerar och utmanar ditt barns nyfikenhet och fantasi.Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig nya saker. Ger ditt barn massor av möjligheter att släppa loss fantasin. Finmotoriken blir gagnad här. Stödjer ditt barns kreativitet. Lämpligt från 2 år till 7 år",
	},
	{
		id: 22,
		title: "Spade 18 cm (blandade färger)",
		price: 15,
		img: "https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/k/skovl-18cm-ass-farver-1-stk_dantoy_1075-1110.jpg",
		description: "Värt att veta. Klassisk skyffel i inbjudande färger. Det är inte så mycket speciellt med denna, och ändå räcker spaden i sig själv för att starta en bra grävlek. Ditt barn kan på nolltid flytta all sand till andra sidan av sandlådan och skyffla tillbaka det mesta igen. Ditt barn kan även nyfiket och fantasifullt gräva efter skatter eller gå på insektsjakt. Kanske kommer ni på att bygga ett sandslott ihop, som naturligtvis ska ha en vallgrav runt om. Det är en spännande överraskning om ni får hem spaden i blå, röd eller gul. Spaden är Svanenmärkt, lämplig för livsmedel och tål en runda i diskmaskinen. Lämpligt för barn i åldern 2 år till 7 år",
	}
];
  export {ProductsList, useProductStore};
	


/*
			<p>Vattenglidbana m. vattenanslutning, 650 x 180 cm</p>
			<p>460,00 kr</p>
			<p>Värt att veta
Med vattenglidbanan kan du skapa din egen minivattenpark hemma i trädgården. Det enda som krävs är en ledig vattenslang.

Här finns plats för två barn att glida iväg och känna hur det kittlar i magen medan kroppen får svalka i sommarvärmen. Vem kommer först?

Troligen det roligaste sättet att bada som finns!

6,5 meter lång och med robusta kanter, så banan kan hålla hela sommaren och plockas fram igen nästa år. Det är en bra idé att strö lite talk på den när du packar ihop den. Det förhindrar att plasten fastnar och går sönder.

Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig saker
Underbar för ditt barns känselsinne. Ett lagom stimulerat känselsinne ökar ditt barns trivsel.
Puffar igång kroppsmedvetenheten för ditt barn.
Ger möjlighet till stora leenden och tjo och tjim.

Mäter: 650 x 180 cm.
Lämpligt från 3 år till 10 år

Mer information
Artikelnummer	02-77825
Ålder	3 år, 4 år, 5 år, 6 år, 7 år, 8 år, 9 år , 10 år
Lämplig för	Känselsinnet, Kroppsmedvetenhet, Skrattmuskler
Material	Plast
Underhåll	Lufttorkas
Ta med	I trädgården
Mått:	650 x 180 cm
</p>
			<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/2/02-77825_-_wehncke_1_.jpg" alt="" />

			<h2>Hoppborg m. badbassäng - Giraff</h2>
			<p>1 825,00 kr</p>
			<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/2/02-18246_-_wehncke_2_.jpg" alt="" />
			<p>Värt att veta
För många barn är det helt enkelt drömmen att få en egen hoppborg.

Den här hoppborgen har en rutschkana, plaskdamm och en palm som kan spruta vatten och ge känselsinnet en kick om du kopplar den till en vattenslang.

Hoppborgen mäter cirka 165 x 165 x 175 cm och poolen mäter 195 x 142 cm.

Denna aktivitet är väldigt värdefull för ditt barns trivsel och förmåga att lära sig nya saker
Stödjer grovmotoriken som får en puff så fort ditt barn rör på sig.
Då aktiveras kroppsmedvetenheten för ditt barn.
Skapar lätt tjo och tjim och skratt.

Mäter: 165 x 165 x 175 cm / Pool: 195 x 142 cm.
Lämpligt för barn i åldern 3 år till 6 år

Mer information
Artikelnummer	02-18246
Ålder	3 år, 4 år, 5 år, 6 år
Lämplig för	Grovmotorik, Kroppsmedvetenhet, Skrattmuskler
Material	Plast
Underhåll	Lufttorkas
Ta med	I trädgården
Kräver/Vad medföljer/Medföljer ej	Levereras ej monterad
Mått:	165 x 165 x 175 cm / Pool: 195 x 142 cm
</p>

<h2>Rutschbana med vattenanslutning, 116 cm</h2>
<p>575,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/2/02-74400_1_.jpg" alt="" />
<p>Värt att veta
Fäst en vattenslang i botten av rutschkanan och ge barnen en alldeles egen vattenrutschkana.

Väger cirka 2 kg, så den kan flyttas runt. Den går att fälla ihop efter användning, så den är lätt att ställa undan.

Max belastning: 25 kg.

Aktiviteten utvecklar färdigheter och är bra för ditt barns trivsel
Utvecklar grovmotoriken som aktiveras varje gång ditt barn rör på sig.
Motiverar ditt barn till att utvecklas och förstärka sin kroppsmedvetenhet.
Kan ge fina skratt så skrattmusklerna blir alldeles ömma.

Mäter: 116 x 36 x 32,5 cm.
Lämpligt för barn i åldern 1 år till 6 år

Mer information
Artikelnummer	02-74400
Ålder	1 år , 18 mån., 2 år, 2,5 år, 3 år, 4 år, 5 år, 6 år
Lämplig för	Grovmotorik, Kroppsmedvetenhet, Skrattmuskler
Sinnen	Balanssinne
Material	Plast
Ta med	I trädgården
Högsta vikt (max kg):	Maks. 25kg
Mått:	116 x 36 x 32,5 cm
</p>

<h2>Fiskebåt 40 cm (blandade), 1 st.</h2>
<p>150,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//1/2/1211-2006909_1_1.png" alt="" />
<p>Värt att veta
Stor fiske-bogserbåt som ditt barn kan leka med på stranden, i poolen eller i badkaret.

Med tre fiskar som båten kan fånga, och som ditt barn även kan använda som små sandformar.

Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig nya saker
Väcker ditt barns fantasi och får leken att blomstra
Perfekt för lekar med roller tillsammans med andra barn då kidsen lär sig att hitta sina platser i leken och inte alltid kan bestämma allting själva.
Stimulerar ditt barns förståelse för orsak-verkan. förmågan att kunna förutse ger trygghet för ditt barn.

Mäter: 40 cm.
Lämpligt från 3 år till 6 år


De flesta barn gillar att skvätta med vatten, och leken kan äga rum såväl på stranden som hemma hos er i badkaret och vid diskhon. Det finns massor av lärande i att märka vattnets droppar, spruta med vattnet, hälla det från en behållare eller känna hur flytkraft kan tvinga upp leksaker till ytan. Dessutom kan du kanske få tvätta håret på ditt barn, medan badleksakerna distraherar.</p>

<h2>Sandlek - Hinkpaket i 8 delar, blå</h2>
<p>295,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/a/sandleg-spands_t-med-8-dele-bl__b-toys_1074-701330_1_.jpg" alt="" />
<p>Värt att veta
Kul lekset för stranden eller sandlådan med lite annorlunda delar.

Här får du:

en krabb-sandform
en sjöstjärne-form
en val
en grävmaskin
en mycket fin väderkvarn
en stor, bra hink
en sil
en skyffel
en kratta
Tar ni med er detta fina sandsetet till stranden så har ni sinnesstimulerande och fantasifulla lekar så det räcker för ditt barn – och då kanske du kan lyckas få 10 minuters avkoppling under parasollet. Kanske.
</p>

<h2>Såpbubblor - Gigant</h2>
<p>240,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/0/s02323-01-ses-creative-saebebobler-gigant.png" alt="" />
<p>Denna aktivitet utvecklar färdigheter och är nyttig för ditt barns trivsel
Stödjer grovmotoriken som aktiveras varje gång ditt barn är i rörelse.
Här är chans till tjo och tjim och skratt.
Förstärker ditt barn i att hitta lugnet och vara i nuet.

Mäter: 30 x 20 x 5 cm.
Lämpligt från 5 år till 8 år

Känner du till SES Creative?
SES Creative skickade ut sina första leksaker på marknaden på 70-talet i Holland, och idag blir leksakerna sålda i hela världen. SES Creative har både helt enkla pysselredskap som tuschpennor/penslar och snygga, stora kits till att t.ex. göra DIY-julklappar eller sin egen drömfångare med. Se de många DIY-seten för barn.

Från 2023 är SES Creative-leksakerna CO2-neutrala.

Du kan hitta alla våra leksaker från SES Creative här.



Ställ en korg med härliga uteleksaker nära dörren ut till trädgården eller innergården.
. Då blir det extralätt att få bort ditt barn från skärmarna och ut och leka. Få inspiration till vad du kan lägga i en sådan korg här i vår blogg. Läs mer här.
</p>

<h2>Jongleringsbollar 3 st.</h2>
<p>75,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//9/0/900471_1_2.png" alt="" />
<p>Värt att veta
Klassiska bollar för ditt barn eller dig själv, om du vill försöka lära dig jonglera. 

Det är en övning i koncentration, öga-handkoordination och tålamod. För det är få som lär sig jonglera på 10 minuter. Men om du övar 10 minuter varje dag, kommer du snabbt att bli bättre.

Att lära sig jonglera är ett fint projekt när du har behov av lugn i sinnet och vill fördjupa dig i att bli bättre på något och följa din egen utveckling på ett tydligt sätt. 

Börja med att kasta upp en av bollarna i luften och fånga den igen. När du kan göra det hyfsat säkert, kan du gå vidare till att öva med två bollar och till slut med alla tre.

Mjuka och lätta att hantera. 

Aktiviteten utvecklar färdigheter och är väldigt värdefull för ditt barns trivsel
Gagnar ditt barns grovmotorik som får en puff så fort ditt barn använder sin kropp.
Stärker öga-handkoordinationen som vi t.ex. använder när vi kastar, griper eller sparkar iväg bollen som flyger mot dig på idrottslektionen, eller när vi klipper noggrant med en sax.
Uppmuntrar ditt barn till att använda sin koncentration.

Passar från 3 år


När ditt barn spelar eller leker med en boll så utvecklas avståndsbedömningen. Bollspel kan även ha regler som det är praktiskt att lära sig att följa - och förhandla. Det är definitivt lärorikt när ditt barn envist fasthåller att det på inget sätt var straff, eller att bollen INTE var ute. Muskel-ledsinnet blir därutom riktigt grundligt aktivera</p>

<h2>
Bodyboard - Medium (Ocean)</h2>
<p>310,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//1/0/1082-970321_-_schildkr_t_1_.png" alt="" />
<p>Värt att veta
Väger 320 gram och har en lämplig storlek för att ge ditt barn roliga upplevelser på stranden. Även bra att leka med i poolen eller simhallen.

Levereras med ett 90 cm snöre så man kan fästa simbrädan på handleden eller runt foten. Det är inte särskilt kul att se sin bodyboard fångas av vågorna och flyta iväg ut i havet.

En kärna av EPS-skum (polystyren expanderad med luft) ger bra flytkraft. Och på utsidan finns en nylonyta.

För barn upp till 60 kilo.

Denna aktivitet är bra för ditt barns trivsel och förmåga att lära sig saker
Leken stärker ditt barns grovmotorik. Det handlar i synnerhet om att kunna styra koordinationsförmågan mellan armar och ben.
Tränar ditt barn i att koordinera kroppen.
Puffar igång ditt barns kroppsmedvetenhet.

Mäter: 68 x 43 x 4,5 cm .
Lämpligt från 3 år till 10 år</p>

<h2>Snorkelset (4-10 år)</h2>
<p>415,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/n/snorkels_t-4-10-_r_schildkr_t_1082-940011_1_.jpg" alt="" />
<p>Värt att veta
Nu har ditt barn möjlighet att dyka på upptäcksresa när ni är på stranden. Det finns nämligen många spännande saker att titta på. Därför är det praktiskt att ha en snorkel så att man inte blir avbruten varje gång man behöver hämta luft.

Snorkeln är flexibel och har en rörlig easy clip-hållare som anpassar sig till de flesta huvudformer och storlekar. I toppen är den neonorange så att den är lätt att se.

Glasögonen är gjorda av säkerhetsglas för att ge bästa utsikt. Remmen är justerbar.

Satsen är perfekt att ta med sig på stranden eller på semestern.

Aktiviteten stödjer viktiga färdigheter som är bra för ditt barns trivsel och förmåga att lära sig nya saker

Lämpligt för barn i åldern 4 år till 10 år


Att sitta i en sandlåda eller vara på stranden är den ultimata lekplatsen för en del kids. Forma sanden till fantasifulla sandslott, snygga kakor eller vägar där favoritbilen kan köra runt i dynerna.

Fram med fantasi, finmotorik, skyffel och hink. Tillägger du vatten och möjlighet att undersöka smådjur på stranden blir lekmöjligheterna plötsligt ännu fler, medan sanden och vattnet stimulerar ditt barns känselsinne (taktila sinnet).
</p>

<h2>Kasta och fånga bollen - 18 cm, 2 st.</h2>
<p>50,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//9/0/90206.jpg" alt="" />
<p>Värt att veta
Håll i handtagen och klicka på avtryckaren - då skjuts kulan upp i luften. Se om ni kan turas om att skjuta iväg kulan och fånga den med korgen. 

Du känner säkert igen detta paket från barndomens strandutflykter eller lek i parken eller sommarstugan. 

Leken ger roliga svettpärlor på pannan när ni springer runt för att vara bäst på att fånga den flygande bollen.

Det finns 2 korgar och 1 boll i paketet.

Aktiviteten utvecklar färdigheter och är nyttig för ditt barns trivsel
Leken stärker grovmotoriken. Det handlar i hög grad om att kunna styra koordinationsförmågan mellan ben och armar.
Utvecklar öga-handkoordinationen som vi till exempel använder när vi kastar, sparkar iväg eller griper en boll som flyger mot oss på idrottslektionen, eller när vi klipper rakt med en sax eller ska hälla upp utan att spilla.
Sätter fart på ditt barns kondition.

Mäter: 18 cm.
Passar från 3 år</p>

<h2>Boll af naturgummi - 7 snälla kompisar, Ø13 cm</h2>
<p>165,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//1/0/1092-sp18031.png" alt="" />
<p>Värt att veta
Härlig boll med ventil för uppblåsning.

Aktiviteten utvecklar viktiga färdigheter som är nyttiga för ditt barns trivsel och förmåga att lära sig nya saker
Då kan ditt barns avståndsbedömning bli stimulerad.
Stimulerar ditt barns grovmotorik som får en boost när ditt barn är i rörelse.
Stärker öga-handkoordinationen som vi bland annat gör bruk av när vi kastar, griper eller sparkar iväg en boll som flyger mot dig på idrottslektionen, eller när vi klipper rakt med saxen.

Lämpligt för barn i åldern 2 år till 6 år


När ditt barn leker eller spelar med en boll så gagnas avståndsbedömningen. Bollspel kan dessutom ha regler som det är praktiskt att lära sig att känna igen - eller förhandla. Så du kan absolut jubla när ditt barn envetet håller fast i att det på inget sätt var straffspark, eller att bollen INTE var ute. Muskel-ledsinnet blir dessutom totalt aktiverat i bollspel, och det sinnet kan rätt och slätt inte överstimuleras.
</p>

<h2>Badbassäng 122 x 122 cm</h2>
<p>490,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//1/2/1211-0775252_1_1.png" alt="" />
<p>Värt att veta
På en varm dag kan det vara besvärligt att vara ett litet barn. Kanske har ni inte tänkt er att åka till stranden idag, då är det smart att kunna sätta upp en liten pool på 5 minuter. 

Denna pool är utformad för att bli klar på nolltid. Fyll den med ljummet vatten, så kan ditt barn bada och plaska sig glad och nöjd. 

</p>

<h2>Simpuffar (18-30 kg.)</h2>
<p>430,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/7/0773034_020.png" alt="" />
<p>Värt att veta
Armpuffar som gör det lättare för ditt barn att hålla huvudet över vattnet när ni är ute och simmar vid stranden eller i en pool. Hjälper ditt barn känna sig trygg och bekväm i vattnet.

Passar barn från 18-30 kg.

Lämna aldrig barn utan uppsikt när de badar.

VARNING: Detta är inte en livräddningsprodukt - får endast användas under tillsyn av en vuxen. Lämna aldrig ditt barn utan tillsyn. Får endast användas på ett vattendjup anpassat för användaren. Risk för explosion: Fyll inte produkten med för mycket luft. Använd inte högtrycksluft för att pumpa upp produkten. Manuell uppblåsning rekommenderas. Se till att alla kamrar är helt uppblåsta.</p>

<h2>5-i-1 Sport- och aktivitetspåse</h2>
<p>395,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//7/5/75201_0.jpg" alt="" />
<p>Värt att veta
En dag på stranden kan väcka bilder av avslappning och en tupplur under parasollet. Men ack - har du barn med dig så kommer det att behövas lite mer action. 

Kanske händer detta efter 5 minuter, kanske först efter bad och picknick - men förr eller senare är det praktiskt att ha tänkt på extra underhållning och aktivitet att packa ner i strandväskan. 

Detta paket är lätt att ta med sig. Det kan ligga färdigpackat hemma, redo för nästa gång det härliga sommarvädret lockar ut er. Det finns saker att göra både för de som behöver lite hjälp för att träna bollöga och öga-handkoordination och för de som är redo att spela beachvolley och kasta sig på magen.

Ni kan även ta med det till skogen, parken eller bara ut i trädgården. 

Innehåll:

strandtennis-paket
uppblåsbar boll med pump, till exempel för volley
velcro-bollpaket
frisbee
badminton</p>

<h2>Vattenbombbollar Ø4 cm - 6 st.</h2>
<p>90,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//0/2/02-75105_1_.jpg" alt="" />
<p>Värt att veta
Gör er redo för ett vattenkrig med dessa roliga bollar som suger åt sig vatten och gör motståndaren plaskblöt.

Denna aktivitet utvecklar färdigheter och är bra för ditt barns trivsel
Stödjer öga-handkoordinationen som vi bl.a. använder när vi håller i en sax och klipper riktigt petigt, vill hälla upp vatten i glaset utan att träffa fel, eller när vi sparkar iväg eller griper bollen som flyger mot oss på idrottslektionen.
Ger möjlighet till tjo och tjim och stora leenden.
Stödjer barnens muskel-ledsinne som du kanske känner till som det kinestetiska eller proprioceptiva sinnet.

Lämpligt för barn i åldern 3 år till 9 år</p>

<h2>Badlek - Basketboll för badet</h2>
<p>180,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//4/2/42-e0221_1_.png" alt="" />
<p>Värt att veta
Basket är väl något man spelar naken?

I varje fall den här typen av basket. Här är nätet enkelt att sätta upp på kaklet i badrummet med sugkoppar, och sedan är det bara att sikta och skjuta.

Inkl. 3 bollar.

Denna aktivitet är bra för ditt barns trivsel och förmåga att lära sig saker
Kan ge ljuvliga skratt så skrattmusklerna blir alldeles ömma.
En ljuvlig presentidé för nyfikna barn.
Nu får kidsen händerna med i leken med orsak/verkan.

Mäter: 19,5 x 16 x 6,5 cm.
Lämpligt från 18 mån. till 5 år


Härlig lek med vatten som kan ske såväl på stranden som hemma hos er vid diskhon och i badkaret. Ditt barn kan lära sig en massa av att leka häll-lekar, droppa med vattnet eller fascineras över leksaker som kan flyta eller sjunka. Samtidigt är badleksaker jättebra på att leda uppmärksamheten på annat håll när ditt barn sitter och badar och håret ska tvättas.</p>

<h2>Badlek med uppdragning - Simmande Teddy</h2>
<p>150,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//4/2/42-e0204_1_.png" alt="" />
<p>Värt att veta
Teddy är en klassisk badleksak som simmar glatt när han dras upp på baksidan.

Aktiviteten utvecklar färdigheter och är bra för ditt barns trivsel
Kan ge ljuvliga skratt som tränar skrattmusklerna.
En ljuvlig presentidé för nyfikna barn.
Nu får ditt barn händerna med i leken med orsak/verkan.

Mäter: 9,8 x 10 x 10 cm.
Lämpligt från 1 år till 5 år


Många barn älskar att leka och skvätta med vatten, och det kan både ske på stranden och hemma hos er i badkaret och vid diskhon. Ditt barn lär sig mycket av att leka med vatten, känna vattnets droppande eller sprutande, hälla vatten från den ena behållaren till den andra eller uppleva hur flytkraft kan tvinga upp leksaker till vattenytan. På samma gång är badleksaker förträffliga på att distrahera när ditt barns hår ska tvättas när det är badstund.
</p>

<h2>Vattenlek - Vattenspridare, larv</h2>
<p>190,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//b/9/b9fa8b5ef7a0323127cc0a2db3298233745b259c_xhap_77872_0k1caldlc0fljw.jpg" alt="" />
<p>Värt att veta
När solen skiner och dagen är ljus är det något av det härligaste att låta barnen svalka sig med vattenlekar. 

Lägg ut denna roliga larv på gräset, anslut trädgårdsslangen (lätt!), och låt barnen hoppa runt och bli härligt blöta medan larven sprutar kallt vatten över dem. Huvudet är lätt att blåsa upp.

När det kalla vattnet träffar ditt barns solvarma kropp, bubblar känseln av förtjusning och humöret höjs ett snäpp. 

Pulsen stiger även, och kanske ger det en energikick och lust att stanna ute i värmen lite längre. Särskilt om det också finns en glass i sikte när det är dags att torka.

Larven är tillverkad av slitstark PVC som håller i många år om du tar hand om den.

När larven ska packas undan är det en bra idé att torka av den ordentligt och strö på talk innan du viker ihop den. Då undviker du att PVC:n klibbar ihop och går sönder.

Köp också några lappar att fixa små hål med, om de uppstår. 

PVC kan inte återvinnas, så om du ser till att den håller så länge som möjligt gör du både miljön och ditt barn en tjänst.

När larvens liv är över och den inte kan lagas längre, kan du klippa isär den och till exempel sy väskor för blöta badkläder eller påsar för smutsiga ombyteskläder av PVC-materialet.

Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig nya saker
Då kan ditt barns avståndsbedömning bli stimulerad.
Mycket bra på att få igång kroppen och därmed ge grovmotoriken stimulans.
Kan ge härliga skratt som tränar skrattmusklerna.

Mäter: 64 x 140 cm .
Lämpligt för barn i åldern 3 år till 8 år
</p>

<h2>Vattenpistoler - Haj och Krokodil</h2>
<p>215,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//v/a/vandpistoler-haj-_-krokodille_b-toys_1074-701551_1_.jpg" alt="" />
<p>Värt att veta
Både krokodilen och hajen kan skjuta ut vatten från munnen, så ni kan ha det härligaste vattenkriget hemma. 

Dra i handtaget baktill och sug upp vatten, tryck sedan ner för att skjuta loss. 

Lekar med vatten är ett bra sätt att öka tryggheten för ditt barn i samband med vattenanpassning.

Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig saker
Fint för ditt barns känselsinne. Ett välintegrerat känselsinne kan förstärka trivseln för ditt barn.
Inspirerar ditt barn till att utveckla sig och stimulera sin kroppsmedvetenhet.
Ger möjlighet till tjo och tjim och stora leenden.

Mäter: Længde: 18 cm.
Lämpligt för barn i åldern 18 mån. till 8 år


Utmärkt vattenlekar som kan både äga rum på stranden och hemma hos er vid diskhon och i badkaret. Ditt barn kan lära sig en massa av att leka med vatten, känna vattnets droppande eller sprutande, hälla vatten från den ena behållaren till den andra eller uppleva hur flytkraft kan tvinga upp leksaker till vattenytan. På samma gång kan du kanske tvätta håret på ditt barn, medan badleksakerna underhåller.
</p>

<h2>Sandlek - Sand- och vattenkvarn, Tropical</h2>
<p>355,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/a/sandleg-sand-og-vandm_lle-tropical_b-toys_1074-701659_1_.jpg" alt="" />
<p>Värt att veta
Fin kvarn i finurlig design som med sugkoppen kan fästas på plattorna vid badkaret och användas i badlekar. Kvarnen kan även användas utomhus, t.ex. på stranden eller i sandlådan.

Låt ditt barn experimentera med tyngdkraft och energiöverföring genom att se vatten eller sand rinna ner genom väderkvarnen och se hur den nedåtgående rörelsen driver hjulet.

Aktiviteten gagnar relevanta färdigheter som är nyttiga för ditt barns trivsel och förmåga att lära sig saker
Släpp loss fantasin och se vart leken leder.
Stärker öga-handkoordinationen som vi till exempel använder när vi griper eller sparkar iväg bollen som kommer flygande på idrottslektionen, eller när vi klipper rakt med saxen.
Nu får ditt barn händerna med i leken med orsak/verkan.

Mäter: 42 x 25 x 14 cm.
Lämpligt för barn i åldern 18 mån. till 6 år


Härlig lek med vatten som kan både ske på stranden och hemma hos er i badkaret och vid diskhon. Det finns massor av lärande i att leka häll-lekar, droppa med vattnet eller fascineras över leksaker som kan flyta eller sjunka. Samtidigt kan du kanske skölja håret på ditt barn, medan badleksakerna underhåller.</p>

<h2>Hink med hällpip 14 cm (blandade färger)</h2>
<p>45,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/p/spand-med-h_ldetud-14cm-ass-farver-1stk_dantoy_1075-1312.jpg" alt="" />
<p>Värt att veta
En hink är oumbärlig i hem med barn. Den kan fyllas med sand eller användas för att vattna med.

Den kan även vara praktisk att ha med sig till stranden när man ska samla musselskal eller små krabbklor.

Observera blandade färger.

Stimulerar och utmanar ditt barns nyfikenhet och fantasi.

Denna aktivitet är nyttig för ditt barns trivsel och förmåga att lära sig nya saker
Ger ditt barn massor av möjligheter att släppa loss fantasin.
Finmotoriken blir gagnad här.
Stödjer ditt barns kreativitet.

Lämpligt från 2 år till 7 år


Stranden eller sandlådan är bland de allra bästa lekplatserna för de flesta kids. Forma sanden till stora sandslott, delikata kakor eller vägar där leksaksbilar kan köra runt i dynerna.

Fram med hink och skyffel, fantasi och finmotorik. Tillägger du undersökning av strandens smådjur, eller möjligheten för att hälla vatten i sanden blir möjligheterna för lek plötsligt ännu fler, medan sanden och vattnet utvecklar ditt barns känselsinne.</p>

<h2>Spade 18 cm (blandade färger)</h2>
<p>15,00 kr</p>
<img src="https://lekakademin.se/cdn-cgi/image/width=700,height=700,format=webp,quality=100/media/catalog/product//s/k/skovl-18cm-ass-farver-1-stk_dantoy_1075-1110.jpg" alt="" />
<p>Värt att veta
Klassisk skyffel i inbjudande färger. Det är inte så mycket speciellt med denna, och ändå räcker spaden i sig själv för att starta en bra grävlek. Ditt barn kan på nolltid flytta all sand till andra sidan av sandlådan och skyffla tillbaka det mesta igen.

Ditt barn kan även nyfiket och fantasifullt gräva efter skatter eller gå på insektsjakt. Kanske kommer ni på att bygga ett sandslott ihop, som naturligtvis ska ha en vallgrav runt om.

Det är en spännande överraskning om ni får hem spaden i blå, röd eller gul.

Spaden är Svanenmärkt, lämplig för livsmedel och tål en runda i diskmaskinen.

Denna aktivitet är kompetensutvecklande och bra för ditt barns trivsel
Släpp loss fantasin och låt fantasin råda.
Här får ditt barn bra fart på finmotoriken.
Får igång ditt barns kreativitet.

Lämpligt för barn i åldern 2 år till 7 år
</p>

<h2></h2>
		</div> */