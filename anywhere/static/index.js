var index = ( function () {
    return{

        init: function () {
            this.setDirectoryPath();
            this.getDirectory();
            this.addClickEvent();
        },

        setDirectoryPath: function () {
           // console.log( window.location );
            $('.directoryPath').text( window.location.pathname );
        },

        // 请求目录
        getDirectory: function () {
            $.ajax({
                url: window.location.origin + "/api/getDirectory",
                data: { "pathname": window.location.pathname },
                type:"POST",
                dataType: "json",
                traditional: true,
                success: function(data){
//                            console.log( data );
                    if( data.code == 200 ){
                        data = data.data;

                        var _content = '';
                        for( var i=0; i < data.length; i++ ){
                            _content += '<li><a isDirectory="' + data[i].isDirectory + '">'
                                + data[i].name + '</a></li>'
                        }
                        $('.directoryBox').html( _content );

                    }else{
                        document.write( data.msg );
                    }

                }
            });
        },

        // 点击事件
        addClickEvent: function () {
            var _self = this;

            $(document).on('click', 'li a', function () {
                var _href = window.location.href + $(this).text();
                if( $(this).attr('isDirectory') == 'true' ) _href += '/';
                window.location.href = _href;
            });
        },

    }
})();

window.onload = function () {
    index.init();
};