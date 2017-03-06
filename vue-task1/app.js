

var Observer = function(dataObj) {
		this.data = dataObj;
		this.walk(dataObj);
};



//遍历要观察的对象属性
Observer.prototype.walk = function (object) {

	var value;

	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			value =	object[key];
			//判断属性的value类型，如果仍然是object，就调用递归算法
			if (typeof value ==="object") {
				new Observer(value);
			};

			//将值传给convert函数
			this.convert(key,value);
		}
	}
}

Observer.prototype.convert = function (key,value) {
	Object.defineProperty(this.data,key,{
		enumerable: true,
        configurable: true,
		get:function() {
			console.log('正在访问'+key+'属性');
			return value;
		},
		set:function(newValue){
			console.log('正在设置'+key+'属性');
			console.log('属性值为'+ newValue);
			if(newValue === value){
				return;
			}
			value = newValue
		}
	});
}

