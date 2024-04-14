package com.boilerreactnativeapplication.presentations

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import com.boilerreactnativeapplication.R
import com.boilerreactnativeapplication.databinding.ActivityPoseInspectorBinding

class PoseInspectorActivity : AppCompatActivity() {

    companion object {
        private const val LOG_TAG = "PoseInspectorActivity"

    }

    private lateinit var binding: ActivityPoseInspectorBinding

    private fun initActivityBinding() {
        binding = DataBindingUtil.setContentView(this, R.layout.activity_pose_inspector)
    }

    private fun initActivityContentClickListener() {
        binding.finishBtn.setOnClickListener { finishCurrentActivity() }
    }

//------------------------------------- Lifecycle Functions ----------------------------------------


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initActivityBinding()
        initActivityContentClickListener()
    }


//------------------------------------- Callback Functions -----------------------------------------

    private fun finishCurrentActivity() {
        val intent = Intent().apply {
            putExtra("count", (99).toString())
        }
        setResult(Activity.RESULT_OK, intent)
        finish()
    }




}