// TODO добавить возможность удаление ребра если в ячейки 0
// ограничить кол-во вершин
// CSS для ячеек и лейблы для строк и столбцов 



$(document).ready(function(){

    // отключаем сразу анимацию для бокса
    // чтобы запустить ее, только тогда, когда будет хотя бы одна вершина
    var viz = document.getElementById("viz");
    viz.style.animationPlayState="paused";
    var max_overflow = document.getElementById("overflow");
    max_overflow.style.animationPlayState = "paused";
    col = $('.matrix').children().length;
    row = $('.matrix').children().length;
    
    
    
    

    // 
    $('.add_btn').click(function(){
        // Если нет ни одной вершины
        // то создаем ее
        // в этом случае col и row равны 0, а значит
        // у ячейки инпута id будет равен id = 00
        if (col == 0){
            $('.matrix').append(
                "<div class=\"col\" id = \""+(col)
                + "\" >\n\t <label for=00>1</label>"+
                "<input type = \"text\" id =\"" +col+""+row+
                "\" oninput = \"onch(this.id,this.value)\" size=\"1\">\n\t </div>"
                )
                
                nodes.add([{id: 1, label:"1" }]);
                
                network.setData({nodes:nodes,edges:edges});
                col++; row++;
                network.moveTo({scale:0.2});
                // запускаем анимацию, создающую бокс
                viz.style.animationPlayState = "running";
                //если вершины уже есть
            } else {
            if (col == 9){
                $('.add_btn').prop('disabled', true);
                $('.add_btn').css('opacity', 0.5);
                max_overflow.style.visibility = "visible";
                max_overflow.style.animationPlayState = "running";
            };
            // добавляем во все существующие строки доп ячейку(колонку)
            // у этой ячейки id будет равно "index row"
            // где index равен номеру строки, row - кол-ву строк + 1
            $('.matrix div').each(function(index){
                $(this).append("<input type = \"text\" id =\""+index+""
                +row + "\"oninput = \"onch(this.id,this.value)\">\n\t");
                $(this).children().first().html(index+1);
                if(index == 0){
                    $('.lab').append("<label>"+(row+1)+"</label>\n\t");
                }
            });


            //копируем и вставляем последнюю строку, изменяя ее id
            var cop = $('.matrix div:last-child').clone();
            cop.attr("id", col);
            cop.children().first().html(col+1);
            $('.matrix').append(cop);
            
            
            //проходимся по всем ячейкам(колонкам) новой строки
            // и меняем id
            var last_col = $('.matrix div').last().children();
            last_col.each(function(index){
                if (index != 0){
                    $(this).attr("id", function(){
                        return row+""+index-1
                    }).val(""); // обнуляем все поля input, чтобы значения не копировались
                }
            });            // с прошлых строк.
            
            // добавляем новую вершину чтобы перерисовать граф
            nodes.add([{id:col+1, label:""+(col+1)+""}]);
            
            

            col += 1; row += 1;
            
        }
        
    });
});