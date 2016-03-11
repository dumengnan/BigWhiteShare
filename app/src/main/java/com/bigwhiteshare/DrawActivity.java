package com.bigwhiteshare;

import android.support.v7.app.AppCompatActivity;
import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

/**
 * Created by dell on 2016/2/1 0001.
 */
public class DrawActivity extends AppCompatActivity {
    public String name,board_name;
    WebView webview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_drawing);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        webview = (WebView) findViewById(R.id.webView);
        WebSettings settings=webview.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setDomStorageEnabled(true);
        //get data from intent
        Intent intent = getIntent();
        board_name = intent.getStringExtra("board_name");
        webview.loadUrl("file:///android_asset/index.html?board_id="+board_name);

    }
}
