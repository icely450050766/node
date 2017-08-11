##### 【运行】`npm run anywhere`

##### 【文件结构】

**config.js**：配置文件   

&gt; 可配置项：      
    1）port（服务器监听端口）   
    2）basePath（要请求的 文件资源的存放的 绝对位置）   
         
&gt; 不可配置项：     
    1）静态资源路径    
    2）anywhere默认显示的页面（选择路径的页面）    
    3）http头部参数（传送的文件类型）

**server.js**：入口程序      

&gt; 不断监听端口，处理请求。       
&gt; 根据请求url，区分是单纯的请求文件，还是请求接口。          
&gt; 请求接口，端口后面跟着的是“api/”，然后判断是请求哪个接口。        
p.s.         
后台接口其实就是浏览器访问一个链接，后台响应访问（请求），      
通过路由解析请求的url、找到并执行对应的处理函数，再返回数据。        
（后台接口的url，其实就是后台自己定义的。路由就是，后台根据定义规则解析，找到处理函数执行）。    

**api/getFile.js**：请求文件   

&gt; url即为 文件资源的路径。    
&gt; 如果是根“/”，则返回anywhere默认页面，让用户选择 资源目录。         
&gt; 扩展了一个参数：filename，如果该参数存在（请求静态资源时），文件路径直接改为filename。         
&gt; 如果请求的 文件资源是文件夹，则返回anywhere默认页面，让用户继续选择 资源目录。         
&gt; 如果请求的 文件资源是文件，则返回该文件。         
&gt; 对response的 文件类型、头部设置。              

**api/getDirectory.js**：请求目录结构
   
&gt; 是post请求，累加接收请求体，用querystring解析请求体。     
&gt; 同步获取子目录，把子目录名称、类型（文件/文件夹）压入数组，返回数组。     
&gt; 子目录顺序恒定，和文件资源一致（压入数组不用push）。     
&gt; 响应请求的数据，要用 JSON.stringify() 处理。     

**api/getStatic.js**：请求静态资源

&gt; 截掉url的“/api/getStatic”，获取对应静态资源文件名，得到静态资源路径。     
&gt; 调用接口getFile()，向浏览器返回文件。   
  
**static文件夹**：存放静态资源

&gt; index.html 即为 anywhere的默认页面（让用户选择 资源目录）。     
&gt; index.html的 样式index.css、脚本index.js，都是请求接口 getStatic 得到的：       
    `<script src="/api/getStatic/index.js"></script>`

