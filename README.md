# OgsFront

### 简介
orangeservers的前端项目，整体部署和展示文档在[OgsDocument](https://github.com/OrangeServers/OgsDocument)

项目使用layui+jquery编写

### 部署

查看不了图片或者克隆慢可以去gitee的仓库，[这是地址](https://gitee.com/xuwei777/OgsFront)

```shell
# 克隆前端项目 国内环境克隆慢可以去gitee克隆
git clone https://github.com/OrangeServers/OgsFront.git
# 也可以直接下载安装压缩包 wget http://download.stisd.cn/ogsfront/OgsFront_v1.0.tar.gz

# 改名
mv OgsFront ogsfront

# 配置nginx配置文件，示例 orangeserver.conf
server {
    listen 8000;

    location / { 
	add_header nw-ip $remote_addr;
        proxy_set_header nw_ip $remote_addr;
        access_log  /data/logs/ogsfront.nginx.log main;
		root /data/tmp/orangefront;      # orangefront文件目录
        index index.html;
        try_files $uri $uri/ $uri $uri.html 404;
    } 


    location /local/ {
        access_log  /data/logs/ogs.nginx.log main;
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Route on; 
        proxy_pass http://127.0.0.1:28000;
    }

    location /server/ {
        access_log  /data/logs/ogs.nginx.log main;
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Route on; 
        proxy_pass http://127.0.0.1:28000;
    }

    location /account/ {
        access_log  /data/logs/ogs.nginx.log main;
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Route on; 
        proxy_pass http://127.0.0.1:28000;
    }

    location /mail/ {
        access_log  /data/logs/ogs.nginx.log main;
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Route on; 
        proxy_pass http://127.0.0.1:28000;
    }

    location /auth/ {
        access_log  /data/logs/ogs.nginx.log main;
        proxy_pass_header Server;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_set_header X-Route on;
        proxy_pass http://127.0.0.1:28000;
    }

    location /wsh/ {
        access_log  /data/logs/ogs.nginx.log main;
        proxy_http_version 1.1;
    	proxy_read_timeout 300;
    	proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection "upgrade";
    	proxy_set_header Host $host:$server_port;
    	proxy_set_header X-Real-IP $remote_addr;
    	proxy_set_header X-Real-PORT $remote_port;
        proxy_pass http://127.0.0.1:8888/;
    }
}

# 启动nginx# 该项目用到了python3环境，redis，mysql，nginx，需要提前安装
# 下载后端服务压缩包
wget http://58.135.83.162:19612/ogsbackend/v1.0/orangeservers_v1.0.tar.gz

# 解压orangeserver压缩包，导入数据文件
tar -xf orangeservers_v1.0.tar.gz && cd orangeservers
# 安装依赖库
pip3 install -r requirements.txt
# 你的数据库地址用户名和密码
mysql -uxxx -pxxx -hx.x.x.x
mysql> create database orange;
# 导入数据文件
mysql -uxxx -pxxx -hx.x.x.x orange < mysqldir/orange.sql

# 修改后端配置文件
cp app/conf/conf_test_exapmple.py app/conf/conf_test.py
vim app/conf/conf_test.py
# 一般只需要修改这三处即可
# 邮件配置
MAIL_CONF = {
    'form_mail': 'you mail name',         # 邮箱账号 不用邮箱功能也可以不配置
    'password': 'you mail password',        # 邮箱密码 这里通过smtp登录需要去邮箱获取授权码，而非密码
    'smtp_server': 'you mail smtp server'    # 邮箱地址 例如163的 stmp.163.com
}

# mysql配置
MYSQL_CONF = {
    'dbname': 'you dababase name',      # 数据库名
    'user': 'you user name',           # 数据库用户名
    'password': 'you password',       # 数据库用户密码
    'host': 'you db host ip',        # 数据库地址
    'port': 3306                    # 数据库端口号
}

# redis配置
REDIS_CONF = {
    'host': 'you redis ip',           # redis地址
    'port': 6379                    # redis端口号
}

# 配置python解释器路径,自行修改
vim start.sh
python3_path='python3'   # 修改值为解释器全路径

# 启动服务，默认有两个端口 28000和8888
chmod +x start.sh
./start start
```

