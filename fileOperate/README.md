##### 【运行】`npm run fileOperate`

##### 【文件结构】

**config.js**：配置文件   

&gt; 可配置项：      
    1）savePath（文件 缓冲区的位置）   
    2）originPath（要处理（复制）的源文件路径，绝对位置）   
        
**index.js**：入口程序      

&gt; 定义了两个方法：清空文件夹、复制文件。       
&gt; 以上两个方法，都是通过递归，实现一层层的目录结构的 删除/复制。          
&gt; 清空文件夹：调用的时候传入 缓冲区位置，只清空缓冲区文件。        
&gt; 复制文件：是把源文件（包括最外层文件夹）复制到缓冲区。      
如果复制文件夹，缓冲区创建文件夹时，需要拿到文件名。      
如果复制文件，直接创建流，用管道复制即可（若缓冲区不存在该文件名的文件，会自动创建该文件）。      
&gt; 复制文件：可传入 复制单个文件的函数，增强可扩展性。      

**codeDir文件夹**：文件 缓冲区的位置


