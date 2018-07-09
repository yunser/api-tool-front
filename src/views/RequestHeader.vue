<template>
    <my-page title="HTTP 请求头">
        <ui-article>
            <table>
               
            <tbody style="border:0px;"><tr style="border:0px;"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Accept</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息指定浏览器或其他客户端可以处理的 MIME 类型。值&nbsp;<strong>image/png</strong>&nbsp;或&nbsp;<strong>image/jpeg</strong>&nbsp;是最常见的两种可能值。</td>
</tr><tr style="border:0px;background-color:rgb(246,244,240);"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Accept-Charset</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息指定浏览器可以用来显示信息的字符集。例如 ISO-8859-1。</td>
</tr><tr style="border:0px;"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Accept-Encoding</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息指定浏览器知道如何处理的编码类型。值&nbsp;<strong>gzip</strong>&nbsp;或&nbsp;<strong>compress</strong>&nbsp;是最常见的两种可能值。</td>
</tr><tr style="border:0px;background-color:rgb(246,244,240);"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Accept-Language</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息指定客户端的首选语言，在这种情况下，Servlet 会产生多种语言的结果。例如，en、en-us、ru 等。</td>
</tr><tr style="border:0px;"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Authorization</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息用于客户端在访问受密码保护的网页时识别自己的身份。</td>
</tr><tr style="border:0px;background-color:rgb(246,244,240);"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Connection</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息指示客户端是否可以处理持久 HTTP 连接。持久连接允许客户端或其他浏览器通过单个请求来检索多个文件。值&nbsp;<strong>Keep-Alive</strong>&nbsp;意味着使用了持续连接。</td>
</tr><tr style="border:0px;"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Content-Length</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息只适用于 POST 请求，并给出 POST 数据的大小（以字节为单位）。</td>
</tr><tr style="border:0px;background-color:rgb(246,244,240);"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Cookie</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息把之前发送到浏览器的 cookies 返回到服务器。</td>
</tr><tr style="border:0px;"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Host</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息指定原始的 URL 中的主机和端口。</td>
</tr><tr style="border:0px;background-color:rgb(246,244,240);"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
If-Modified-Since</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息表示只有当页面在指定的日期后已更改时，客户端想要的页面。如果没有新的结果可以使用，服务器会发送一个 304 代码，表示&nbsp;<strong>Not Modified</strong>&nbsp;头信息。</td>
</tr><tr style="border:0px;"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
If-Unmodified-Since</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息是 If-Modified-Since 的对立面，它指定只有当文档早于指定日期时，操作才会成功。</td>
</tr><tr style="border:0px;background-color:rgb(246,244,240);"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
Referer</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息指示所指向的 Web 页的 URL。例如，如果您在网页 1，点击一个链接到网页 2，当浏览器请求网页 2 时，网页 1 的 URL 就会包含在 Referer 头信息中。</td>
</tr><tr style="border:0px;"><td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
User-Agent</td>
<td style="font-size:1em;border-style:solid;border-color:rgb(212,212,212);vertical-align:top;">
这个头信息识别发出请求的浏览器或其他客户端，并可以向不同类型的浏览器返回不同的内容。<br></td>
</tr></tbody>
            </table>
        </ui-article>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
</style>
