let pages = [];
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const book_nav = document.getElementById("book-nav");
let links = []
let cur_page = -1;

page1.style.height = "100%";
page1.style.boxShadow = "";

// Source - https://stackoverflow.com/a/9083076
// Posted by Rene Pot, modified by community. See post 'Timeline' for change history
// Retrieved 2026-10-14, License - CC BY-SA 4.0
function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
fetch("src/odyssey.txt")
    .then(response => response.text())
    .then(text => {
        const WORDS_PER_PAGE = 240;
        
        const lines = text.split(/\r?\n/);
        const segments = [];
        
        let current_page_html = "";
        let cur_words = [];
        let page_word_count = 0;
        let cur2_page = 0



        function push_out_pargraph() {
            if (cur_words.length > 0) {
                current_page_html += `<p>${cur_words.join(" ")}</p>`;
                cur_words = [];
            }
        }
        function end_page() {
            push_out_pargraph();
            if (current_page_html.trim() != "") {
                segments.push(current_page_html);
                current_page_html = "";
                page_word_count = 0;
                cur2_page+=1
            }
        }       
        for (let raw_line of lines) {
            const line = raw_line.trim();
            // ifall blank rad
            if (!line) continue;
            console.log(line)
            // Phrasing grejer använt AI, fattar fortfarande inte
            if (/^BOOK.*$/i.test(line)) {
                end_page();
                
                // När det är space. Regex från google ai overview
                current_page_html += `<h2 id="${line.toLowerCase().replace(/\s+/g, '-')}">${line}</h2>`;
                links.push(cur2_page)
                continue;
            }
            // När det är space. Regex från google ai overview
            const words = line.split(/\s+/);

            for (let word of words) {
                if (page_word_count >= WORDS_PER_PAGE) {
                    end_page();
                }
                cur_words.push(word);
                page_word_count++;
            }

            push_out_pargraph();
        }

        end_page();

        pages = segments;
        load_page(-1);
        gen_nav();
        checkPageParam();

    });

function create_nav(index){
   let base = `<li><a href="?p=${links[index]}">Chapter ${romanize(index)}</a></li>`;
   
   book_nav.innerHTML += base;
}
function gen_nav(){
    book_nav.innerHTML = ""
    for(let i =0; i <= 23; i++){
        create_nav(i+1)
    }
}


function load_page(page_number) {
    if (page_number >= 0){
        page1.style.transitionDuration = "0s";
        page1.style.transform = "rotateY(0deg)";
        page1.style.animation = "";
        page1.offsetHeight; 
        page1.style.transitionDuration = "2s";
        page1.style.transform = "rotateY(90deg)";
        page2.style.backgroundImage = "";
        page2.style.backgroundImage = "";
        page1.style.animation = "flip_page 2s ";
        if (page_number == 0){
            page1.innerHTML= "";

            page2.style.backgroundImage = "";
            page1.style.backgroundImage = "url('img/cover.png')";
            
            page2.innerHTML = pages[page_number];
        } else {
            console.log(page_number);
            page1.style.backgroundImage = "";
    
            page1.innerHTML = pages[page_number-1];
            page1.offsetHeight; 
            
            page2.innerHTML = pages[page_number];
        }
    } else {
        page1.style.transitionDuration = "0s";
        page1.style.transform = "rotateY(90deg)";
        page2.style.backgroundImage = "url('img/cover.png')";
    }
}

page2.addEventListener("click", () => {
    cur_page++;
    load_page(cur_page);
});

function checkPageParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const p = urlParams.get('p');
    if(p != null){
        cur_page = p
        load_page(p)
    }
    
}
window.addEventListener('popstate', checkPageParam);
  
checkPageParam();