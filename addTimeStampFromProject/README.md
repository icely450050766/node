##### 【运行】`npm run addTimeStampFromProject`
（基于 fileOperate文件 运行）

##### 【文件结构】

**config.js**：配置文件   

&gt; 可配置项：      
    1）savePath（文件 缓冲区的位置）   
    2）originPath（要处理（复制）的源文件路径，绝对位置）    
     
&gt; 不可配置项：正则表达式      
 1）externalResourcesReg（外部资源：href=""|src=""）   
 2）timeStampReg（href/src属性值内，匹配时间戳）  
        
**index.js**：入口程序      

&gt; 下面只讨论单个文件的处理，批量的文件处理，基于fileOperate实现。          
&gt; 主要使用流的 pipe中间进行处理。读 文件流->中间处理 -> 写文件流。          
&gt; 中间处理层：读入文件全部内容，匹配（href|src）正则，得到一个要处理的字符串数组。          
    遍历数组，对每个数组元素（字符串）做“增加时间戳”的操作，用操作后的字符串覆盖源字符串。          
&gt; 增加时间戳：3种情况：        
    无“?”，直接插入字符串。       
    有“?”，无timeStamp参数：直接插入字符串。      
    有“?”，有timeStamp参数：替换timeStamp参数值。       
  
**build文件夹**：文件 缓冲区的位置


