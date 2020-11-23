$(document).ready(function () {

    let click = new Main();
    click.request(0,'List');
    $(document).on('click', '.click', function () {
        click.request($(this).attr('data-id'),$(this).attr('data-type'));
    });
});

class Main
{
    path = 'requests/get_data.php';

    request(id, type)
    {
        $.ajax({
            type: "POST",
            url: this.path,
            data: {id:id,type:type},
            success: function(data){
                console.log(data);
                Main.epilogRequest(data,type);
            }
        });
    }

    static epilogRequest(data,type)
    {
        data = JSON.parse(data);
        let finalHtml = CreateHtml['create'+ type](data);
        let output = new Output();
        output.render(finalHtml);
    }
}

class Output
{
    block = '.block';

    render(html)
    {
        let block = document.querySelector(this.block);
        $(block).html(html);
    }
}

class CreateHtml
{
    static createList(data)
    {
        let html = "<div class=\"lists\">\n";
        for (let i = 0; i < data.length; i++) {
            html += "            <div class = 'list'>\n";
            html += "                <p class=\"list-title\">" + "Тариф " + "\"" + data[i]['title']+ "\"" +"</p>\n";
            html += "                <hr class=\"list-hr gray\">\n" ;
            html += "                <div class=\"list-elems\">\n" ;
            html += "                    <div class=\"list-elems-options\">\n" ;
            html += "                        <span class=\"list-elems-options-speed "+ data[i]['color'] + "\" >"+ data[i]['speed'] +" Мбит/с</span>\n" ;
            html += "                        <span class=\"list-elems-options-price\">"+ data[i]['price'] + " ₽/мес</span>\n" ;
            if (data[i]['free_options']) {
                html += "        <div class=\"list-options-free\">\n" ;
                for (let j = 0; j < data[i]['free_options'].length; j++) {
                    html += "        <span class=\"list-options-free-text\">"+  data[i]['free_options'][j] + "</span>\n" ;
                }
                html += "        </div>\n"
            }
            html += "                    </div>\n" ;
            html += "                    <div class=\"list-elems-list click\" data-id=\""+ i +"\" data-type=\"Tariff\">\n" ;
            html += "                        <span class=\"list-elems-list-span\">></span>\n" ;
            html += "                    </div>\n" ;
            html += "                </div>\n" ;
            html += "                <hr class=\"list-hr grayer\">\n" ;
            html += "                <div class=\"list-link\">\n" ;
            html += "                    <a class=\"list-link-href\" href=\"" + data[i]['link']+ "\">узнать подробнее на сайте www.sknt.ru</a>\n" ;
            html += "                </div>\n" ;
            html += "            </div>"
        }
        html +=  "</div>";
        return  html;
    }

    static createTariff(data)
    {
        let monnht = {1:'месяц',3:'месяца',6:'месяцев',12:'месяцев'};
        let html = "             <div class=\"block-title\">";
        html += "                    <div class=\"block-title-back click\" data-id='"+ 0 +"' data-type='List'><";
        html += "                    </div>\n";
        html += "                    <span class=\"block-title-value\">"+ "Тариф " + "\"" + data[0]['title']+ "\"" + "</span>\n";
        html += "                    <div class=\"block-title-empty click\" data-id='"+ 0 +"' data-type='List'></div>";
        html += "                    </div>\n";
        html += "                </div>\n";
        html += "<div class=\"tariffs\">\n";

        for (let i = 0; i < data.length; i++) {
            html += "            <div class = 'tariff'>\n";
            html += "            <p class = 'tariff-title'>"+ data[i]['pay_period'] + " " + monnht[data[i]['pay_period']] + "</p>\n";
            html += "                <hr class=\"tariff-hr gray\">\n" ;
            html += "                <div class=\"tariff-elems\">\n" ;
            html += "                    <div class=\"tariff-elems-options\">\n" ;
            html += "                        <p class=\"tariff-elems-options-price_month\">"+ data[i]['price_month'] + " ₽/мес</p>\n" ;
            html += "                        <span class=\"tariff-elems-options-price\">"+ "разовый платеж - " + data[i]['price'] + " ₽</span>\n" ;
            if (data[i]['discount']){
                html += "                    <span class=\"tariff-elems-options-price\">"+ "скидка - " + data[i]['discount'] + " ₽</span>\n" ;
            }
            html += "                    </div>\n" ;
            html += "                    <div class=\"tariff-elems-tariff click\" data-id=\""+ data[i]['ID'] +"\" data-type=\"Time\">\n" ;
            html += "                        <span class=\"tariff-elems-tariff-span\">></span>\n" ;
            html += "                    </div>\n" ;
            html += "                </div>\n" ;
            html += "            </div>"
        }
        html +=  "</div>";

        return  html;
    }

    static createTime(data)
    {
        let monnht = {1:'месяц',3:'месяца',6:'месяцев',12:'месяцев'};
        let html = "             <div class=\"block-title\">";
        html += "                    <div class=\"block-title-back click\" data-id='"+ data['prev_id'] +"' data-type='Tariff'><";
        html += "                    </div>\n";
        html += "                    <span class=\"block-title-value\">"+ "Выбор тарифа" + "</span>\n";
        html += "                    <span class=\"block-title-empty\">"+ "</span>\n";
        html += "                </div>\n";

        html += "            <div class = 'time'>\n";
        html += "            <p class = 'time-title'>"+ 'Тариф ' +  "\"" + data['title'] + "\"" + "</p>\n";
        html += "                <hr class=\"time-hr gray\">\n" ;
        html += "                <div class=\"time-elems\">\n" ;

        html += "                    <div class=\"time-elems-elem\">\n" ;
        html += "                        <span class=\"time-elems-elem-price_month\">"+ "Период оплаты - " + data['pay_period'] + " " + monnht[data     ['pay_period']] + " </span>\n" ;
        html += "                        <span class=\"time-elems-elem-price_month\">"+ data['price_month'] + " ₽/мес</span>\n" ;
        html += "                    </div>\n" ;
        html += "                    <div class=\"time-elems-elem\">\n" ;
        html += "                        <span class=\"time-elems-elem-price\">"+ "разовый платеж - " + data['price'] + " ₽</span>\n" ;
        html += "                        <span class=\"time-elems-elem-price\">"+ "со счета спишется - " + data['price'] + " ₽</span>\n" ;
        html += "                    </div> \n" ;
        html += "                    <div class=\"time-elems-elem\">\n" ;
        html += "                        <span class=\"time-elems-elem-period\">"+ "вступит в силу - сегодня" + "</span>\n" ;
        html += "                        <span class=\"time-elems-elem-period\">"+ "активно до " + data['date'] + " </span>\n" ;
        html += "                    </div>\n" ;

        html += "                    <hr class=\"time-hr gray\">\n" ;
        html += "                    <div class='time-submit'>\n" ;
        html += "                       <span class='time-submit-text'>Выбрать</span>\n" ;
        html += "                    </div>\n" ;

        html += "                </div>\n" ;

        html +=  "</div>";

        return  html;
    }
}