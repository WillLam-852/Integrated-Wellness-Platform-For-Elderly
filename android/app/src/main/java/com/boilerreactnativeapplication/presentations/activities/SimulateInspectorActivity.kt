package com.boilerreactnativeapplication.presentations.activities

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.boilerreactnativeapplication.R
import com.boilerreactnativeapplication.data.plan.ExercisePlan
import com.boilerreactnativeapplication.databinding.ActivitySimulateInspectorBinding
import com.boilerreactnativeapplication.presentations.viewmodelfactories.PoseInspectorViewModelFactory
import com.boilerreactnativeapplication.presentations.viewmodels.PoseInspectorViewModel

class SimulateInspectorActivity : AppCompatActivity() {

    companion object {
        private const val LOG_TAG = "SimInspectorActivity"
    }

    private var binding: ActivitySimulateInspectorBinding? = null
    private var viewModel: PoseInspectorViewModel? = null
    private var viewModelFactory: PoseInspectorViewModelFactory? = null


//------------------------------------- Initialization ---------------------------------------------


    //TODO: get the plan list from the intent ( Should do data process when get React Native Data )
    private fun getExercisePlanFromIntent(): List<ExercisePlan> {
        return listOf();
    }

    private fun initActivityBindingAndVM() {
        binding = DataBindingUtil.setContentView(this, R.layout.activity_simulate_inspector)
        viewModelFactory = PoseInspectorViewModelFactory(application, listOf<ExercisePlan>())
        viewModel = ViewModelProvider(this, viewModelFactory!!).get(PoseInspectorViewModel::class.java)
        binding!!.lifecycleOwner = this
    }

    private fun initActivityContentClickListener() {
        binding?.let { binding ->
            binding.finishBtn.setOnClickListener { finishCurrentActivity() }
        }
    }

    private fun initObserveFunction() {
        binding?.let { binding ->
            viewModel?.let { viewModel ->
//            viewModel.headPosition.observe(this) { updateHeadCoordinate(it) }
            }?: Log.e(LOG_TAG, "View Model has no been initialized.")
        } ?: Log.e(LOG_TAG, "Binding has ne been initialized.")
    }


//------------------------------------- Lifecycle Functions ----------------------------------------


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initActivityBindingAndVM()
        initActivityContentClickListener()
        initObserveFunction()
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