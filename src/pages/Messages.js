import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";
import Message from "./Message" //<-Messageコンポーネントをインポート


const Messages = () => { //このコンポーネントの役割として名前はMessagesの方がわかりやすい。あとmapで回すコンポーネントをMessageとするため改名
  const [messages, setMessages] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return {
            content: doc.data().content,
            timestamp: doc.data().timestamp.toDate(), //この部分でfirebaseより取得
            docid : doc.id  //<- keyを設定するためにidを所得　あとあと削除機能等をつけようと思った時にも便利
          };
        });
        setMessages(messages);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    let valueReplace = value.replace(/\s+/g, "");
    if (valueReplace === "") {
      alert("メッセージを入力してください。");
      return;
    }
    firebase.firestore().collection("messages").add({
      content: value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() //<-new Date()だとそのパソコンの時刻が使われるのでズレる場合を考慮してサーバーサイドの時刻を追加する
    });
    setValue("");
  };

  return (
    <>
      <ul>
        {messages?.map((message) => { // <- messagesの後の?はオプショナルチェイニングといってmessagesがnullやundefinedであったとしても許容してくれる
          return <Message message={message} key={message.docid} /> //messagesのひとつ一つの要素を使ってMessageコンポーネントを表示 propsにmessageを渡す。keyにはfirebaseのdocidをつかう
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          placeholder="メッセージを入力"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
    </>
  );
};

export default Messages;
