var number=3;
        window.onload = () => {
            // 给获取的 id 添加点击事件
            // 添加用户
            document.getElementById("btn_submit").onclick = function () {
            number=number+1;
            let username=number;
				
                // let tel = document.getElementById("tel").value;
                let tbody = document.getElementById("userTbody");
               
                    // 设置要插入的表格行信息
                    let tr = "<tr id=\"" + number + "\">\n" +
                        "<td>" + username + "</td>\n" +
                        "<td width=\"250\">" + "" + "</td>\n" +
                        "<td width=\"50\"><a href=\"javascript:delRow(number)\">删除</a></td>\n" +
                        "</tr>";

                    // 把新插入的行信息插入表格中
                    
                    tbody.innerHTML += tr;
            };

            document.getElementById("btn_removeAll").onclick = () => {
                var tbody = document.getElementById("userTbody");
                tbody.innerHTML = "";
                number=0;
            };
        };
        // 删除用户
        function delRow(id) {
            let tr = document.getElementById(id);
            tr.parentNode.removeChild(tr);
            console.log(id);
            console.log(number.toString());
            if(id==number.toString()){
            	number=number-1;
            	console.log("bfbbf");
            }
        }