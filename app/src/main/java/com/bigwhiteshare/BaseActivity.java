package com.bigwhiteshare;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

/**
 * Created by dell on 2016/2/1 0001.
 */

public class BaseActivity extends AppCompatActivity {
    private String board_name, android_id, name;
    private EditText board_text;
    private TextView welcome_text;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_base);
        welcome_text = (TextView) findViewById(R.id.wtextView);
        board_text = (EditText) findViewById(R.id.editText);
        Button joinButton = (Button) findViewById(R.id.button);
        joinButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptJoin();
            }
        });
}

    //根据用户输入的id，加入到某一个白板共享房间中
    public  void  attemptJoin(){
        board_name=board_text.getText().toString().trim();

        if(board_name.length() == 0){
            Toast.makeText(this.getApplicationContext(),"Enter Board Name please.",Toast.LENGTH_SHORT).show();
        }else{
            Toast.makeText(this.getApplicationContext(),"Joining "+board_name,Toast.LENGTH_SHORT).show();
            welcome_text.setText("Welcome " + board_name + ".");

            Intent intent = new Intent(this,DrawActivity.class);
            intent.putExtra("board_name",board_name);
            startActivity(intent);

        }
    }

    @Override
    protected void onResume(){
        board_text.setText("");
        super.onResume();

    }
}
