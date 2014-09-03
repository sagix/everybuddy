(function(){
    "use strict";
    var json;

    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        json = JSON.parse(xmlhttp.responseText);
        populateList(json);
        document.getElementById('loader').style.display = 'none';

      }
    }
    xmlhttp.open('GET','api.json',true);
    xmlhttp.send();
    
    var detail = document.getElementById('detail_contact');
    var bt_back = document.getElementById('bt_back');
    bt_back.addEventListener('click', function(){
        bt_back.classList.remove('bt_visible');
        detail.classList.add('detail_empty');
        
    });

    function populateList(data){
        var ul = document.getElementById('list_contact'),
            fragment = document.createDocumentFragment();

        data.buddies.forEach(function(buddy){
            console.log(buddy);
            var li = createElement('li', 'li_container group');
            var figure = createElement('figure', 'li_figure');
            var img = createElement('img', 'li_img');

            var desc = createElement('div', "li_desc");
            var name = createElement('span', "li_fullname");
            var post = createElement('small', "li_post");

            img.src = buddy.avatar;
            name.textContent = buddy.firstname + ' ' + buddy.lastname;
            post.textContent = buddy.post;

            figure.appendChild(img);
            li.appendChild(figure);
            desc.appendChild(name);
            desc.appendChild(post);
            li.appendChild(desc);

            li.addEventListener('click', function(event){
                onClickBuddy(event, buddy);
            }, false);

            fragment.appendChild(li);
        })
        ul.appendChild(fragment);

    }

    function createElement(name, className){
        var element = document.createElement(name);
        if(className !== undefined){
            element.className = className;
        }
        return element;
    }

    function getSkill(id){
        var skill;

        json.skills.forEach(function(data){
            if(data.key === id){
                skill = data;
            }
        });

        return skill;
    }

    function getMission(id){
        var mission;

        json.missions.forEach(function(data){
            if(data.key === id){
                mission = data;
            }
        });

        return mission;
    }

    function onClickBuddy(event, buddy){
        
        var img = detail.getElementsByClassName('dt_img')[0];
        var fullname = detail.getElementsByClassName('dt_fullname')[0];
        var post = detail.getElementsByClassName('dt_post')[0];
        var phone = detail.getElementsByClassName('dt_phone')[0];
        var mail = detail.getElementsByClassName('dt_mail')[0];
        var list_skills = detail.getElementsByClassName('dt_list_skills')[0];
        var list_missions = detail.getElementsByClassName('dt_list_missions')[0];

        img.src = buddy.avatar;
        fullname.innerText = buddy.firstname + ' ' + buddy.lastname;
        post.innerText = buddy.post;
        phone.innerText = buddy.phone;
        phone.href = 'tel:' + buddy.phone;
        mail.innerText = buddy.mail;
        mail.href = 'mailto:' + buddy.mail + '(' + buddy.firstname + '%20' + buddy.lastname + ')';

        var f_skills = document.createDocumentFragment();

        if(buddy.skills !== undefined){
            buddy.skills.forEach(function(skill_id){
                var li = createElement('li', '');
                var skill = getSkill(skill_id);
                li.innerText = skill.name;
                f_skills.appendChild(li);
            });
        }
        var f_missions = document.createDocumentFragment();
        if(buddy.missions !== undefined){
            buddy.missions.forEach(function(mission_desc){
                var li = createElement('li', '');
                var mission = getMission(mission_desc.key);
                li.innerText = mission.name;
                f_missions.appendChild(li);
            });
        }

        list_skills.appendChild(f_skills);
        list_missions.appendChild(f_missions);

        bt_back.classList.add('bt_visible');
        detail.classList.remove('detail_empty');
    }

})();