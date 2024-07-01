package com.boilerreactnativeapplication.presentations.activities

import android.app.Activity
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.boilerreactnativeapplication.R
import com.boilerreactnativeapplication.data.plan.model.ExercisePlans
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


    private fun getExercisePlanFromIntent(): ExercisePlans? {
        var plans: ExercisePlans? = null
        plans = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            intent.getSerializableExtra("plans", ExercisePlans::class.java)
        } else {
            intent.getSerializableExtra("plans") as ExercisePlans
        }
        return plans;
    }

    private fun initActivityBindingAndVM(plans: ExercisePlans?) {
        binding = DataBindingUtil.setContentView(this, R.layout.activity_simulate_inspector)
        viewModelFactory = PoseInspectorViewModelFactory(application, plans)
        viewModel = ViewModelProvider(this, viewModelFactory!!).get(PoseInspectorViewModel::class.java)
        binding!!.lifecycleOwner = this
    }

    private fun initActivityContentClickListener() {
        binding?.let { binding ->
            viewModel?.let { viewModel ->
                binding.finishBtn.setOnClickListener { finishCurrentActivity() }
                binding.progressIncreaseBtn.setOnClickListener { viewModel.updateProgress(true) }
                binding.progressDecreaseBtn.setOnClickListener { viewModel.updateProgress(false) }
            }
        }
    }

    private fun initObserveFunction() {
        binding?.let { binding ->
            viewModel?.let { viewModel ->
                viewModel.plan.observe(this) { binding.execerciseNameTv.text = it.name }
                viewModel.count.observe(this) { binding.countTv.text = it.toString() }
                viewModel.progress.observe(this) { binding.progressTv.text = it.toString() }
                viewModel.isFinishExercise.observe(this) { if(it) finishCurrentActivity() }
//            viewModel.headPosition.observe(this) { updateHeadCoordinate(it) }
            }?: Log.e(LOG_TAG, "View Model has no been initialized.")
        } ?: Log.e(LOG_TAG, "Binding has ne been initialized.")
    }


//------------------------------------- Lifecycle Functions ----------------------------------------


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val plans: ExercisePlans? = getExercisePlanFromIntent()
        initActivityBindingAndVM(plans)
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