import React,{useState,useEffect} from "react";

let getJsonFile = (pathToFile) => {
  let request = new XMLHttpRequest();

  request.open("GET", pathToFile, false);
  request.send(null);

  let my_JSON_object = JSON.parse(request.responseText);

  return my_JSON_object;
};
const allEmoji = getJsonFile("https://emoji-api-app.herokuapp.com/");


// fetch() позволяет вам делать запросы, схожие с XMLHttpRequest(XHR).Основное отличие заключается в том,
//  что Fetch API использует Promises(Обещания), которые позволяют использовать более простое и чистое API,
//   избегать катастрофического количества callback'ов и необходимости помнить API для XMLHttpRequest.

// fetch('https://emoji-api-app.herokuapp.com/')
//   .then(res => res.json())
//   .then(data => allEmoji(data))


// у нас есть массив с именем и фамилией
// let arr = ["Ilya", "Kantor"]

// деструктурирующее присваивание
// записывает firstName=arr[0], surname=arr[1]
// let [firstName, surname] = arr;

// console.log(firstName); // Ilya
// console.log(surname); // Kantor




const App = () => {
  // Хук useState возвращает массив из двух элементов (состояние, функция изменения состояние), а принимает начальное состояние.
  // Первым элементом является начальное состояние, которое мы передаём,  вторым — функция, изменяющая это состояние при ее вызове и передаче нового значения. 
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  console.log(useState([]));
  useEffect(() => {
    // код подписки на ресурс (отписываться не стала,удалеие особо не надо)
    const newData = allEmoji.filter(emoji => emoji.keywords.toLowerCase().includes(search.toLowerCase()))
    setData(newData);
  }, [search]) 
  //  Загадочынй [search] здесь чтобы эффект не срабатывал при каждом рендеренге а только при изменении search (если надо один раз сработать эффекту на [] заменяем)
  return (
    
    <div>
      

    <div class="top_color">
    <div class="container">
        <div class="box_top_name">
            <div class="emoji_name">Emoji Finder</div>
            <div class="emoji_name_under">Find emoji by keywords </div>
        </div>
    </div>
</div>
<div class="search_block"> 
<input placeholder="PlaceHolder "type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
            <div class="cards">

    {data.map(emoji=>  
        
    <div class="card_items" onClick={()=>{navigator.clipboard.writeText(emoji.symbol)}}>
        <div class="card_content">
            <div class="card_img" >{ emoji.symbol}</div>
            <div class="card_name">{ emoji.title}</div>
            <div class="card_desc">{ emoji.keywords}</div>
        </div>
    </div>


      )}
       </div>
    </div>

  
      )
      
}
export default App