// Node.js の標準ライブラリである http と url を 'node:' という接頭辞をつけて読み込むんじゃ
import http from "node:http";
import url from "node:url";

// サーバーが動くポート番号を設定するぞ。
// 環境変数 PORT があればそれを使うが、なければ 8888 番を使うようにするんじゃ。
const PORT = process.env.PORT || 8888;

// ここでWebサーバー本体を作っておるんじゃ
const server = http.createServer((req, res) => {
  // アクセスされたURLの情報を、扱いやすいように解析するんじゃ
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  console.log(`リクエストを受け付けたぞ: ${pathname}`);

  // HTTPレスポンスのヘッダーを設定する。文字化けしないように文字コードをUTF-8に指定するんじゃ。
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // URLのパス名によって応答を変えるぞ
  if (pathname === "/") {
    // ルートパス ('/') にアクセスされた場合
    console.log("ルートパスへの応答を返しておる");
    res.writeHead(200); // ステータスコード 200 (成功) を設定
    res.end("こんにちは！"); // "こんにちは！" というテキストを返す
  } else if (pathname === "/ask") {
    // '/ask' パスにアクセスされた場合
    console.log("/ask パスへの応答を返しておる");
    // クエリパラメータ 'q' の値を取得するんじゃ
    const question = parsedUrl.searchParams.get("q") || "";
    res.writeHead(200); // ステータスコード 200 (成功) を設定
    res.end(`Your question is '${question}'`); // 質問内容を含んだテキストを返す
  } else {
    // それ以外のパスにアクセスされた場合
    console.log("見つからないパスじゃ");
    res.writeHead(404); // ステータスコード 404 (Not Found) を設定
    res.end("ページが見つかりません");
  }
});

// 設定したポート番号でサーバーを起動し、リクエストを待ち受けるんじゃ
server.listen(PORT, () => {
  console.log(
    `サーバーがポート ${PORT} で起動したぞ。 http://localhost:${PORT}/ で確認できるはずじゃ。`
  );
});
