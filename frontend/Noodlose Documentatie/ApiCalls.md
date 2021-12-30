## API Calls
#
<h2> Alles in Folder API/ behalve ApiCalls.ts is voor de pagina naar waar het is vernoemd </h2>
<h2> Wat doen deze functies? </h2>
<h3> deze functies zijn async met als return een Promise, de promise is in het zelfde vorm als de backend heeft aangegeven als het in backend veranderd hier ook! </h3>
<h3> in de functie body is er een constante path deze wordt samen gevoegd met de BaseURL in .env bestand als het een get request is gebruik je get, post gebruik je post, etc etc <h3>
<h4> als je een api call wil gebruiken in een component maak je 2 react hooks aan, een Set voor de items die uit de API komen en en IsLoaded<h4>
<h4> voorbeeld : 

```ts
const [isLoaded, setIsLoaded] = useState<boolean>(false);
const [Item, setItem] = useState<CustomType | undefined>(undefined);
useEffect(() => {
    ConsumeEffect(setIsLoaded, setItem, () => {return getFunction();});
},[?PossibleDepency]);
```
<h4>