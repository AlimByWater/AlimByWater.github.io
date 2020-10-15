// TODO добавить возможность удаление ребра если в ячейки 0
// ограничить кол-во вершин
// CSS для ячеек и лейблы для строк и столбцов 



$(document).ready(function(){
    col = $('.matrix').children().length;

    // настройки для отображения графа
    var options = {
        width:"100%",
        interaction:{hover:true, zoomSpeed: 0.7},
        nodes:{
            shape:'circle', 
            color:{background:'#A63333',highlight:"#A60522", hover:{background:'#730220'}},
            borderWidth: 0, borderWidthSelected: 4, font:{size:20 , color:"#D9BD9C"}, margin:10
        },
        edges:{
            width:1,
            hoverWidth:0.5,
            color:{
              color: "#AFBFAA",
              highlight: "#A6035D",
              hover:"#32D9D9"
            }
        },
        physics: {
            forceAtlas2Based: {
              gravitationalConstant: -56,
              centralGravity: 0.005,
              springLength: 250,
              springConstant: 0.05,
              damping:0.5,
            },
            maxVelocity: 100,
            solver: "forceAtlas2Based",
            timestep: 0.5,
            stabilization: {iterations:-11, },
          },
          autoResize: true,

    };
    

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
                "<input type = \"text\" id =\"0000"+
                "\" oninput = \"onch(this.id,this.value)\" size=\"1\">\n\t </div>"
                )
                
                network.setOptions(options);
                // устанавливаем zoom для графика 
                network.once('stabilized', function() {
                    var scaleOption = { scale : 0.8 };
                    network.moveTo(scaleOption);
                })
                // добавляем первую вершину
                nodes.add([{id: 1, label:"1" }]);
                
                network.setData({nodes:nodes,edges:edges});
                col++; 
                // запускаем анимацию, создающую бокс
                viz.style.animationPlayState = "running";
                //если вершины уже есть


            } else {
            if (col == 19){
                $('.add_btn').prop('disabled', true);
                $('.add_btn').css('opacity', 0.5);
                max_overflow.style.visibility = "visible";
                max_overflow.style.animationPlayState = "running";
            };
            // добавляем во все существующие строки доп ячейку(колонку)
            // у этой ячейки id будет равно "index row"
            // где index равен номеру строки, row - кол-ву строк + 1
            $('.matrix div').each(function(index){
                $(this).append(function(){
                    if (index < 10){ id1 = "0"+index}
                    else {id1 = index;};

                    if (col < 10){ id2 = "0"+col}
                    else{ id2 = col};

                    return ("<input type = \"text\" id =\""+id1+id2+
                            "\"oninput = \"onch(this.id,this.value)\">\n\t")
                });

//                $(this).children().first().html(index+1);
                if(index == 0){
                    $('.lab').append("<label>"+(col+1)+"</label>\n\t");
                }
            });


            //копируем и вставляем последнюю строку, изменяя ее id
            var cop = $('.matrix div:last-child').clone();
            cop.attr("id", col);
            cop.children().first().html(col+1);
            cop.children().each(function(index){
                if(index != 0){
                    $(this).css("background","#8C8881")}
            });
            $('.matrix').append(cop);
            
            
            //проходимся по всем ячейкам(колонкам) новой строки
            // и меняем id
            var last_col = $('.matrix div').last().children();
            last_col.each(function(index){
                if(col < 10){id1 = "0"+col}
                else(id1 = col)
                
                if(index < 11){ id2 = "0"+(index-1) }
                else { id2 = (index-1) };
                
                if (index != 0){
                    $(this).attr("id", function(){
                        return id1+""+id2
                    }).val(""); // обнуляем все поля input, чтобы значения не копировались
                }
            });            // с прошлых строк.
            
            // добавляем новую вершину чтобы перерисовать граф
            nodes.add([{id:col+1, label:""+(col+1)+""}]);
            
            // добавляем ребра в дополнения графа
            for (var i=0; i  < nodes.length-1; i++){
                if (col+1 < 10) { col_a = "0"+(col+1)}
                else { col_a =""+ (col+1)};

                if ( i+1 < 10) {i_a = "0"+(i+1)}
                else {i_a = ""+(i+1)};
                
                complement_edges.add([{id:col_a+i_a, from:col+1, to: i+1}]);
            };

            col += 1;
            
        }
    });

    var i = 0;
    $('.complement').click(function(){
        if (i == 0 ){
            i=1;
            data = {nodes:nodes, edges:complement_edges};
            network.setData(data);
            $('.complement').html("Switch to initial graph");
        }else {
            i = 0;
            data = {nodes:nodes, edges:edges};
            network.setData(data);
            $('.complement').html("Switch to complement graph");
        }
    });

});