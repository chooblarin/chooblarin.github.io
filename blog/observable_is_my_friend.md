---
date: "2015-03-17T22:57:00+09:00"
draft: false
title: "Observableは友達"
slug: "observable_is_my_friend"
tags: ["Java", "RxJava"]
---

この文章は RxJava と RxAndroid について書かれています．
開発中の Android アプリに導入してみて得られた知見をまったりざっくりまとめてみます．

### Rx とリアクティブプログラミング

これについて解説している記事は既にたくさん（ここ最近では特に）あるので割愛します．
せっかくなので分かりやすかった記事をいくつかリンクします．

- [Grokking RxJava](http://blog.danlew.net/2014/09/15/grokking-rxjava-part-1/)
- [Top 7 Tips for RxJava on Android — Futurice](http://futurice.com/blog/top-7-tips-for-rxjava-on-android)
- [Reactive Porn - steps to phantasien](http://steps.dodgson.org/b/2014/12/07/reactive-porn/)
- [関数型プログラマのための Rx 入門（前編） - Okapies' Archive](http://okapies.hateblo.jp/entry/2015/03/04/031148)

### Observable の生成

[Observable の生成](https://github.com/ReactiveX/RxJava/wiki/Creating-Observables)は複数の方法があります．
`create()`を使うとあらゆるデータを`Observable`にラップ出来ます．
ファイル読み書き，ローカル DB アクセス，ネットワーク通信に関連するデータはほとんど全て`create()`を使って Observable に出来ます．

例えば，assets フォルダの中の"hoge.json"からテキストを読み込んでくるときはこんなカンジ．

```java
Observable<JSONObject> load(final Context context) {
 return Observable
   .create((OnSubscribe<AppItem>) subscriber -> {
     InputStream inputStream = null;
     BufferedReader reader = null;
     StringBuilder buf = new StringBuilder();

     try {
       inputStream = context.getAssets().open("hoge.json");
       reader = new BufferedReader(new InputStreamReader(inputStream));
       String str;

       while ((str = inputStream.readLine()) != null) {
         buf.append(str);
       }
       subscriber.onNext(new JSONObject(buf.toString()));
       subscriber.onComplete();

     } catch (JSONException | IOException e) {
       subscriber.onError(e);

     } finally {
       try {
         if (inputStream != null) {
           inputStream.close();
         }
         if (reader != null) {
           reader.close();
         }
       } catch (IOException ignored) {}
     }
   });
}
```

呼び出し側ではこんなカンジ．

```java
dataService.load(context)
  .subscribeOn(Schedulers.io())
  .observeOn(AndroidSchedulers.mainThread())
  .subscribe(
    _jsonObject -> {
      bindData(_jsonObject);
    },
    error -> {
      // error handling
    }
  );
```

ローカル DB へのアクセスも．

```java
  Observable
    .create(subscriber -> {
      try {
        /* データを取得して */
        onNext(data); /* データをemit */

      } catch (Exception e) {
        /* エラー処理があればやっておく．トランザクションのキャンセル処理など */
        subscriber.onError(e);
      } finally {
        /* 後始末 */
      }

      subscriber.onCompleted();
    })
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(observer);
```

### Hot と Cold

- Hot ･･･ subscribe されていなくても値を emit する．
- Cold ･･･ `subscribe()`が呼ばれるまで値を emit しない．`subscribe()`毎に新しく値を emit する．

subscriber が値を emit しはじめるのは，その Observable が subscribe されてからです．つまり，`subscribe()`が呼ばれるまでは何も起こりません．
更に，Observable は subscribe が呼ばれる度に値を`create`のオペレーターが実行されます．

[この記事](http://qiita.com/toRisouP/items/f6088963037bfda658d3)がわかりやすいです．

例えば以下のようにファイルから読み込んだデータを複数の Observer が subscribe したいとします．

```java
Observable<JSONObject> jsonObject
  = dataService
      .load()
      .subscribeOn(Schedulers.io())
      .observeOn(AndroidSchedulers.mainThread());

jsonObject.subscribe(observer1);

jsonObject.subscribe(observer2); // 無駄にファイルを読み直している
```

この例では，同じデータなのに 2 回もファイルを読みにいってしまいます．
Subject を使うと Hot な Observable でこの問題を解決出来ます．先ほどの例をこんなカンジに変えてみます．

```java
PublishSubject<JsonObject> subject = PublishSubject.create();

subject.asObservable().subscribe(observer1);
subject.asObservable().subscribe(observer2);

Observable<JSONObject> jsonObject
  = dataService
      .load()
      .subscribeOn(Schedulers.io())
      .observeOn(AndroidSchedulers.mainThread())
      .subscribe(subject);
```

以上でした．
